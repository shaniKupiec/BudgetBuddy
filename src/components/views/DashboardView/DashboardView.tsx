import React from 'react';

interface DashboardViewProps {
    items: any[];
}

const DashboardView: React.FC<DashboardViewProps> = ({ items }) => {
    return (
        <div>
            <h2>Dashboard</h2>
            <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        {item.name} - {item.cost} ({item.category})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DashboardView;
