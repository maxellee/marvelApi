import img from './error.gif';

const ErrorMessage = () => {
    return (
        <img src={img} alt="" style={{display: 'block', width: "250px", height: "250px", objectFit: 'contain', margin: "0 auto"}} />
        // <img src={process.env.PUBLIC_URL + '/error.gif'} alt="" /> // Конструкція для того щоб використовувати статичні файли з public
    )
}

export default ErrorMessage;