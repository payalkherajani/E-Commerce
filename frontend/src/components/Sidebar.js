import React from 'react'

const Sidebar = () => {
    return (
        <>
            <aside className="sidebar">
                <nav>
                    <ul className="sidebar-list-group">
                        <li className="sidebar-list-item gray">
                            Low to High
                        </li>
                        <li className="sidebar-list-item gray">
                            High to Low
                        </li>
                    </ul>
                </nav>
            </aside>
        </>
    )
}

export default Sidebar;