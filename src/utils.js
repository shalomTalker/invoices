export const generateRandomId = () => Math.random().toString().slice(2, 11);

export const getCurrentHebDate = () => new Date().toLocaleDateString('he-HE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
