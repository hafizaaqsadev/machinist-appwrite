import logo from "../assets/logo.2.png"; 
  
export default function Footer() {
  return (
    <footer className="bg-machinistBlue text-white px-6 md:px-10 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <img src={logo} alt="Machinist Logo" className="h-12 mb-4" />
          <p className="text-sm">Your Trusted Home Services Provider</p>
        </div>

        <div>
          <h4 className="font-bold mb-2">Services</h4>
          <ul className="space-y-1 text-sm">
            <li><a href="#" className="hover:underline">AC Services</a></li>
            <li><a href="#" className="hover:underline">Carpenter Services</a></li>
            <li><a href="#" className="hover:underline">Electrician Services</a></li>
            <li><a href="#" className="hover:underline">Plumber Services</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-2">Available in</h4>
          <ul className="space-y-1 text-sm">
            <li><a href="#" className="hover:underline">Lahore</a></li>
            <li><a href="#" className="hover:underline">Karachi</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-2">Connect with us</h4>
          <ul className="space-y-1 text-sm">
            <li><a href="#" className="hover:underline">Facebook</a></li>
            <li><a href="#" className="hover:underline">Instagram</a></li>
            <li><a href="#" className="hover:underline">LinkedIn</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Info */}
      <div className="mt-8 text-sm text-center border-t border-white/30 pt-4">
        &copy; {new Date().getFullYear()} Machinist. All rights reserved.
      </div>
    </footer>
  );
}
