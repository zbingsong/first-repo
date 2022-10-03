import React from 'react'

export default class HeaderComponent extends React.Component {
  render() {
    return (
      <div>
        <header>
            <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
                <div>
                    <span>Employee Management System</span>
                </div>
            </nav>
        </header>
      </div>
    )
  }
}
