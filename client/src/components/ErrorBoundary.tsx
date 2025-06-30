import { Component, ErrorInfo, ReactNode } from "react";
import { AlertCircle, ChevronDown, ChevronUp, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { handleGlobalError, AppError, createError } from "@/lib/errorHandling";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  componentName?: string;
}

interface State {
  hasError: boolean;
  error?: Error | AppError;
  errorInfo?: ErrorInfo;
  showDetails: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    showDetails: false
  };

  public static getDerivedStateFromError(error: Error): Partial<State> {
    // Convert to AppError if it's not already one
    const appError = error instanceof AppError 
      ? error 
      : createError(error.message, {
          code: 'CLIENT_RENDER_ERROR',
          cause: error
        });
    
    return { hasError: true, error: appError };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Use our centralized error handling
    handleGlobalError(error, errorInfo);
    
    // Store error info for display
    this.setState({ errorInfo });
  }

  private toggleDetails = () => {
    this.setState(prevState => ({
      showDetails: !prevState.showDetails
    }));
  }

  private resetError = () => {
    this.setState({
      hasError: false,
      error: undefined,
      errorInfo: undefined
    });
  }

  public render() {
    if (this.state.hasError) {
      const { error, errorInfo, showDetails } = this.state;
      const componentName = this.props.componentName || 'component';
      
      // Check if it's our AppError type for better formatting
      const isAppError = error instanceof AppError;
      const errorCode = isAppError ? error.code : 'UNKNOWN_ERROR';
      const errorMessage = isAppError 
        ? error.getUserFriendlyMessage() 
        : error?.message || 'An unexpected error occurred';

      return this.props.fallback || (
        <Card className="my-4 border-destructive shadow-md">
          <CardHeader className="bg-destructive/10">
            <CardTitle className="flex items-center text-destructive">
              <AlertCircle className="h-5 w-5 mr-2" />
              Error in {componentName}
            </CardTitle>
            <CardDescription className="text-destructive/90">
              {errorCode}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>{error?.name || 'Error'}</AlertTitle>
              <AlertDescription>
                {errorMessage}
              </AlertDescription>
            </Alert>
            
            <div className="flex justify-between items-center mb-4">
              <Button
                variant="outline"
                onClick={this.resetError}
                className="bg-background flex items-center"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
              
              <Collapsible open={showDetails} className="w-full max-w-md">
                <CollapsibleTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={this.toggleDetails}
                    className="flex items-center ml-2"
                  >
                    {showDetails ? (
                      <>Hide Details <ChevronUp className="ml-1 h-4 w-4" /></>
                    ) : (
                      <>Show Details <ChevronDown className="ml-1 h-4 w-4" /></>
                    )}
                  </Button>
                </CollapsibleTrigger>
                
                <CollapsibleContent>
                  <div className="mt-4 p-4 bg-muted rounded-md overflow-auto max-h-[300px]">
                    <div className="text-xs font-mono whitespace-pre-wrap">
                      {isAppError && (
                        <>
                          <p className="font-semibold mb-2">Error Code:</p>
                          <p className="mb-4">{errorCode}</p>
                          
                          {error.context && (
                            <>
                              <p className="font-semibold mb-2">Context:</p>
                              <pre className="mb-4 overflow-auto">{JSON.stringify(error.context, null, 2)}</pre>
                            </>
                          )}
                        </>
                      )}
                    
                      <p className="font-semibold mb-2">Error Stack:</p>
                      {error?.stack || 'No stack trace available'}
                      
                      {errorInfo && (
                        <>
                          <p className="font-semibold mt-4 mb-2">Component Stack:</p>
                          {errorInfo.componentStack}
                        </>
                      )}
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </CardContent>
        </Card>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
