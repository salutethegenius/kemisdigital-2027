export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  company: string;
  image?: string;
}

/**
 * Centralized testimonials data to ensure consistency across the application
 * This data is used in Home page and can be used in other components as needed
 */
export const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "KemisDigital has been a true game-changer for my non-profit! Since the launch of our landing page in October 2024, we've captured over 1,200 leads and achieved an impressive increase in social media engagement. Their expertise and dedication have elevated our digital presence and propelled us to new heights. We look forward to a long relationship with KemisDigital.",
    author: "Azaleta Ishmael-Newry",
    role: "CEO",
    company: "MAP Bahamas Non-Profit",
    image: "https://lightning.kemisdigital.com/assets/map-bahamas-ceo.jpeg"
  },
  {
    id: 2,
    quote: "Kenneth and his team at KemisDigital transformed our tourism business with their innovative approach. Their deep understanding of the Bahamian market combined with cutting-edge digital marketing strategies helped us reach a wider audience and increased our bookings by 45%. They truly embody the 'People's Choice' spirit.",
    author: "Nathaniel Butler, CFP",
    role: "CEO",
    company: "Drewber Solutions", 
    image: "https://lightning.kemisdigital.com/assets/nat%20(1).jpg"
  },
  {
    id: 3,
    quote: "https://youtu.be/YQWbgUtp-4A",
    author: "Scharad Lightbourne",
    role: "CEO",
    company: "Pro Headshots Brand",
    image: "https://images.unsplash.com/photo-1577179338526-7a24b36e8a6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
  }
];

export default testimonials;