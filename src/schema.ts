import * as Yup from 'yup';

Yup.setLocale({
  string: {
    min: "${label} deve conter ao menos ${min} caracteres",
    max: "${label} deve possuir até ${max} caracteres",
    
  }
})

export default Yup.object().shape({
  name: Yup.string().min(3).max(30).required('O nome é obrigatório').label('nome'),
  email: Yup.string().email('Email precisa ser válido').required('O email é obrigatório'),
  password: Yup.string().min(6).max(50).required('A senha é obrigatória').label('Senha'),
  passwordMatch: Yup.string().oneOf([Yup.ref('password')], "As senhas precisam ser iguais").required('Confirme sua senha')
})