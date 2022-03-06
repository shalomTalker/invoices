export const generateRandomId = () => Math.random().toString().slice(2, 11);

export const formatToHebDate = (timestamp) => new Date(timestamp).toLocaleDateString('he-HE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
