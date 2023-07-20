import { Component } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";

class ErrorBoundary extends Component{
    state = { 
        error: false,
    }

    // static getDerivedStateFromError(error){
    //     // Займається лише тим що оновлення стан. СетСтейт якій працює лише з помилкою
    //     return {error: true};

    // }
    
    componentDidCatch(err, errInfo){
        console.log(err, errInfo);
        this.setState({
            error: true,
        })
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage/> 
            // Запобіжники ловлять помилки в методах render, в життєвих циклах компонентів і в конструкторах дочерних елементів
            // запобіжники не ловлять помилки які виникли в обробниках подій. Події відбуваються не в методі рендер
            // запобіжники не ловлять помилки в асинхроному коді, бо невідомо коли він виконається
            // запобіжники не ловлять помилки в запобіжниках
        }
        return this.props.children;

    }
}

export default ErrorBoundary;