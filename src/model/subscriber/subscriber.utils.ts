const emailIsValid = (email:string):boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default { emailIsValid };
