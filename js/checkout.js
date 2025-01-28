
// Exercise 6
function validate() {
	var error = 0;
	//All fields and validation rules in the same array for easy reusability
	const fields = [
        {
            id: "fName",
            rules: [{test: (value) => /^[a-zA-Z]{3,}$/.test(value)}]
        },
        {
            id: "fLastN",
            rules: [{test: (value) => /^[a-zA-Z]{3,}$/.test(value)}]
        },
        {
            id: "fEmail",
            rules: [{ test: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)}]
        },
        {
            id: "fAddress",
            rules: [{test: (value) => value.trim().length >= 3}]
        },
        {
            id: "fPassword",
            rules: [{test: (value) => /^(?=.*[a-zA-Z])(?=.*\d).{4,8}$/.test(value)}]
        },
        {
            id: "fPhone",
            rules: [{test: (value) => /^\d{9}$/.test(value)}]
        }
    ]; 
// Validate fields entered by the user in a single loop
fields.forEach(({id, rules}) => {
	const input = document.getElementById(id);
	const value = input.value.trim();
	let validInput = true;

	for (const {test} of rules) {
		if (!test(value)) {
			validInput = false;
			error++;
			input.classList.add('is-invalid');
			break;
		}
	}
	if(validInput) {
		input.classList.remove('is-invalid');
	}
});
	if (error > 0) {
		alert('Error');
	} else {
		alert('OK');
	}
}
