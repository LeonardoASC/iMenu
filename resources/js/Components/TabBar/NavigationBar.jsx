import React, { useState, useRef, useEffect } from 'react';
import './TabBar.scss';
import { Link } from '@inertiajs/react';

export function NavigationBar() {

    const [activeIndex, setActiveIndex] = useState(0);
    const [posX, setPosX] = useState('54px');
    const navRef = useRef(null);

    const entries = [
        { label: 'Home', routeName: 'menu.index' },
        { label: 'Pedidos', routeName: 'order.userOrder' },
        { label: 'Comanda', routeName: 'menu.command' },
    ];

    useEffect(() => {
        const current = route().current();
        const idx = entries.findIndex(item => item.routeName === current);
        if (idx !== -1) { setActiveIndex(idx)}

        if (!navRef.current) return;
        const ulElement = navRef.current;
        const liElements = ulElement.querySelectorAll('li');
        if (activeIndex < 0 || activeIndex >= liElements.length) return;

        const li = liElements[activeIndex];
        const liRect = li.getBoundingClientRect();
        const ulRect = ulElement.getBoundingClientRect();
        const leftOffset = liRect.left - ulRect.left;
        const xValue = leftOffset + liRect.width / 2;

        setPosX(`${xValue}px`);
    }, [activeIndex]);


    return (
        <nav className="tabbar">
            <ul ref={navRef} style={{ '--x': posX }}>
                {entries.map((item, i) => {
                    const liClasses = `${i === activeIndex ? 'active' : ''}`;
                    return (
                        <li key={item.label} className={liClasses}>
                            <Link href={route(item.routeName)} onClick={() => setActiveIndex(i)}>
                                <span>{item.label}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );

}

