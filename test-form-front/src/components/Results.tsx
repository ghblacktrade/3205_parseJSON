import React
    from "react";

interface Results {
    email: string
    number: string
}

interface ResultsProps {
    results: Results[]
}

const Results: React.FC<ResultsProps> = ({results}) => {
    return (
        <div>
            <h3>Results: </h3>
            <ul>
                {results.map((result, id) => (
                    <li key={id}>
                        <b>Email: </b>
                        {result.email},
                        <b>Number: </b>
                        {result.number}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Results;