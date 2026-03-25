import axios from 'axios';

export const fetchMockJobs = async () => {
  try {
    const response = await axios.get('https://dummyjson.com/products?limit=6');
    // Transform products to fake jobs to meet the requirement
    const statuses = ['Applied', 'Interview Scheduled', 'Offer Received', 'Rejected'];
    return response.data.products.map(product => {
      // Create a fake date within the last 30 days
      const daysAgo = Math.floor(Math.random() * 30);
      const appliedDate = new Date();
      appliedDate.setDate(appliedDate.getDate() - daysAgo);

      return {
        id: crypto.randomUUID(),
        company: product.brand || 'Tech Corp',
        role: `${product.title} Engineer`,
        location: 'Remote',
        salary: `$${Math.round(product.price)}k - $${Math.round(product.price + 20)}k`,
        platform: 'Mock API',
        status: statuses[Math.floor(Math.random() * statuses.length)],
        appliedDate: appliedDate.toISOString(),
        interviewDate: null,
        notes: product.description,
        bookmarked: false
      };
    });
  } catch (error) {
    console.error('Error fetching mock jobs:', error);
    return [];
  }
};
