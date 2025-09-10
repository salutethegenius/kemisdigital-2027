
const fetch = require('node-fetch');

async function testEnterpriseForm() {
  console.log('🧪 Testing Enterprise Form Submission...\n');
  
  const testData = {
    name: "John Test Attorney",
    email: "test@lawfirm.com",
    phone: "+1-555-0123",
    firmName: "Test Legal Associates",
    firmSize: "6-20",
    notes: "This is a test submission to verify the Enterprise form is working correctly."
  };

  try {
    console.log('📤 Sending test inquiry...');
    console.log('Data:', JSON.stringify(testData, null, 2));
    
    const response = await fetch('http://localhost:3000/api/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: testData.name,
        email: testData.email,
        service: 'LawBey Enterprise',
        message: `Enterprise Inquiry - LawBey
        
Name: ${testData.name}
Email: ${testData.email}
Phone: ${testData.phone}
Law Firm: ${testData.firmName}
Firm Size: ${testData.firmSize}

Special Requirements:
${testData.notes}`
      }),
    });

    console.log('\n📊 Response Status:', response.status);
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ SUCCESS: Enterprise form test passed!');
      console.log('📧 Email should be sent to: frontdesk@kemisdigital.com');
      console.log('Response:', result);
    } else {
      const error = await response.json();
      console.log('❌ FAILED: Enterprise form test failed!');
      console.log('Error:', error);
    }
    
  } catch (error) {
    console.log('❌ NETWORK ERROR:', error.message);
    console.log('\n🔧 Make sure:');
    console.log('1. Backend server is running on port 3000');
    console.log('2. Gmail secrets are properly configured');
    console.log('3. GMAIL_USER and GMAIL_APP_PASSWORD are set');
  }
}

// Run the test
testEnterpriseForm();
