(function() {

    const formInstance = document.querySelector('#generator');
    const output = document.querySelector('#password');
    const chars = {
        letters: 'qwertyuiopasdfghjklzxcvbn',
        capitals: 'QWERTYUIOPASDFGHJKLZXCVBNM',
        digits: '1234567890',
        special: '`~!@#$%^&*()-_=+[{]}\\|;:\'\",<.>/?'
    }

    const helper = {
        getRandomInt: function(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        }
    }

    const form = {
        getJSON: (form) => {
            const formData = new FormData(form),
                data = {};

            for (let input of formData.entries()) {
                data[input[0]] = input[1];
            }
            return data;
        },
        isEmpty: (data) => {
            if (data['passlength'] === '') {
                return true;
            }
            return false;
        },
        hasChars: (data, groupname)=>{
            return groupname in data;
        }
    }

    const generator = {
        generateCharSet:(hasCaps, hasDigits, hasSpecial, chars)=>{
            let set = chars.letters;
            if(hasCaps) set += chars.capitals;
            if(hasDigits) set += chars.digits + chars.digits;
            if(hasSpecial) set += chars.special;
            return set;
        },
        generatePassword:(length, charset)=>{
            let password = '';
            for(let i =0;i<length;i++) {
                password += charset[helper.getRandomInt(0, charset.length)]
            }
            return password;
        }
    }

    formInstance.addEventListener('submit', (e) => {
        const data = form.getJSON(formInstance);
        if(!form.isEmpty(data)){
            const charset = generator.generateCharSet(
                form.hasChars(data,'capitals'),
                form.hasChars(data,'digits'),
                form.hasChars(data, 'special'),
                chars);
            const password = generator.generatePassword(data.passlength, charset);
            output.textContent = password;

        } else {
            alert('Uzupełnij długość hasła');
        }
        e.preventDefault();
    })
})();
