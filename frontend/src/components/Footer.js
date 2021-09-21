import React from 'react'


const Footer = () => {
    return (
        <footer className="footer" >
            <div className="copywrite">
                <p className="padding_one"> Copyright &copy; 2021 Safarnama </p>
                <p className="padding_one"> Connect with me @here <i className={`fab fa-connectdevelop icon_red`}></i> </p>
            </div>

            <div>
                <ul className="unorderedlist">
                    <li className="list_item">
                        <a href="https://twitter.com/payal_kherajani" target="_blank">
                            <i className={`fab fa-twitter icon_styling`}></i>
                        </a>
                    </li>

                    <li className="list_item">
                        <a href="https://www.linkedin.com/in/payalkherajani/" target="_blank">
                            <i className={`fab fa-linkedin-in icon_styling`}></i>
                        </a>
                    </li>

                    <li className="list_item">
                        <a href="https://github.com/payalkherajani" target="_blank">
                            <i className={`fab fa-github icon_styling`}></i>
                        </a>
                    </li>

                    <li className="list_item">
                        <a href="https://www.instagram.com/" target="_blank">
                            <i className={`fab fa-instagram icon_styling`}></i>
                        </a>
                    </li>
                </ul>
            </div>

        </footer>
    )
}

export default Footer;