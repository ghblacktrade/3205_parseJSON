import { useEffect, useState } from 'react';
import './index.css'
import Form from "./components/Form";
import axios, { CancelTokenSource } from "axios";
import { Simulate } from "react-dom/test-utils";
import error = Simulate.error;
import Results from "./components/Results";

interface Result {
    email: string
    number: string
}

const App = () => {

    const [results, setResults] = useState<Result[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [cancelTokenSource, setCancelTokenSource] = useState<CancelTokenSource | null>(null);

    const search = async (formData: {email: string, number: string}) => {

        if (cancelTokenSource) {
            cancelTokenSource.cancel('Request canceled');
        }
        const newCancelTokenSource = axios.CancelToken.source();
        setCancelTokenSource(newCancelTokenSource);

        setLoading(true)
        axios
            .post<Result[]>('http://localhost:3000/search', formData, {
                cancelToken: newCancelTokenSource.token,
            })
            .then((response) => {
                setResults(response.data)
            })
            .catch((err) => {
                console.error('Err:', error)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    useEffect(() => {
        return () => {
            if (cancelTokenSource) {
                cancelTokenSource.cancel('Unmount')
            }
        }
    }, [cancelTokenSource])

    return (
        <div className='app'>
            <Form searchData={search}/>
            {loading ? <p> Loading.... </p> : <Results results={results}/>}
        </div>
    );
};

export default App;