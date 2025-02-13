// components/Footer.tsx
const Footer = () => {
    return (
      <footer className="bg-gray-900 text-white py-4 px-6 mt-10 text-center">
        <p>&copy; {new Date().getFullYear()} My Website. All rights reserved.</p>
      </footer>
    );
  };
  
  export default Footer;