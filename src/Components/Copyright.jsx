import logo from "../assets/logo/logo2.png";

export default function Copyright() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center bg-gray-100 px-6 py-4 text-center sm:text-left">
      <p className="text-sm text-gray-600 mb-2 sm:mb-0">
        © 2025 Machinist.com (Pvt) Ltd. All rights reserved.
      </p>
      <img
        src={logo}
        alt="Machinist Company Logo"
        className="h-7 w-auto"
      />
    </div>
  );
}
