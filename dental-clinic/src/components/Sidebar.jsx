import React from 'react'
import './Sidebar.css'

const NavItem = ({ children, active }) => (
  <div className={"nav-item" + (active ? ' active' : '')}>{children}</div>
)

export default function Sidebar(){
  return (
    <aside className="sidebar">
      <div className="brand">HealthApp</div>

      <nav className="nav">
        <NavItem active>Dashboard</NavItem>
        <NavItem>Messages</NavItem>
        <NavItem>My Health</NavItem>
        <NavItem>Settings</NavItem>
      </nav>

      <div className="profile">
        <img className="profile-avatar" src="/avatar-placeholder.svg" alt="profile" />
        <div>
          <div className="profile-name">Maria Garcia</div>
          <div className="profile-id">Patient ID: 738491</div>
        </div>
      </div>

      <div className="sidebar-actions">
        <button className="ghost">Help Center</button>
        <button className="ghost">Log Out</button>
      </div>
    </aside>
  )
}
