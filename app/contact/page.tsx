export default function ContactPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-2xl w-full">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-gray-600 mb-8">
          Get in touch with us for any questions or concerns.
        </p>
        
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Email</h2>
            <p className="text-gray-600">support@cyberstore.com</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-2">Phone</h2>
            <p className="text-gray-600">+1 (555) 123-4567</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-2">Address</h2>
            <p className="text-gray-600">
              123 Tech Street<br />
              San Francisco, CA 94102<br />
              United States
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
