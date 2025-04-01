const Help = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Help & Support</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Get help with your account and find answers to common questions
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Documentation</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Explore our comprehensive documentation to learn more about features and usage.
          </p>
          <button className="text-blue-500 hover:text-blue-600 font-medium">
            View Documentation &rarr;
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">FAQs</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Find answers to frequently asked questions about our platform.
          </p>
          <button className="text-blue-500 hover:text-blue-600 font-medium">
            View FAQs &rarr;
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Contact Support</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Need help? Our support team is here to assist you.
          </p>
          <button className="text-blue-500 hover:text-blue-600 font-medium">
            Contact Support &rarr;
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Community</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Join our community to connect with other users and share experiences.
          </p>
          <button className="text-blue-500 hover:text-blue-600 font-medium">
            Join Community &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Help; 