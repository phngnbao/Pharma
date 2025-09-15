// Example Usage Patterns for re-title implementation

// 1. Hook-based approach (Current implementation in most components)
import { useTitle, PAGE_TITLES } from '../hooks/useTitle';

const HomePage = () => {
    useTitle(PAGE_TITLES.HOME);

    return (
        <div>
            <h1>Welcome to PharmaCare</h1>
            {/* Component content */}
        </div>
    );
};

// 2. Component-based approach (Alternative pattern)
import { PageTitle } from '../hooks/useTitle';

const AlternativeHomePage = () => {
    return (
        <div>
            <PageTitle title="Home" />
            <h1>Welcome to PharmaCare</h1>
            {/* Component content */}
        </div>
    );
};

// 3. Dynamic titles (like in CategoryDetails)
import { useTitle } from '../hooks/useTitle';

const CategoryDetailsPage = ({ categoryName }) => {
    useTitle(categoryName ? `${categoryName} - Medicine Category` : 'Category Details');

    return (
        <div>
            <h1>{categoryName} Medicines</h1>
            {/* Component content */}
        </div>
    );
};

// 4. Programmatic title updates (using useReTitle directly)
import { useReTitle } from 're-title';
import { useEffect, useState } from 'react';

const DynamicTitleComponent = () => {
    const setTitle = useReTitle();
    const [count, setCount] = useState(0);

    useEffect(() => {
        setTitle(`Counter: ${count} | PharmaCare`);
    }, [count, setTitle]);

    return (
        <div>
            <h1>Số lượt truy cập: {count}</h1>
            <button onClick={() => setCount(c => c + 1)}>Tăng</button>
        </div>
    );
};

export { HomePage, AlternativeHomePage, CategoryDetailsPage, DynamicTitleComponent };
