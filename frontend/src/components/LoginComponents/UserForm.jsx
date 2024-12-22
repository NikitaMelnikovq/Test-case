import React from 'react';
import '../../styles/LoginStyles/UserForm.css';

const UserForm = ({ title, fields, onChange, onSubmit, buttonLabel }) => {
  return (
    <form onSubmit={onSubmit} className="user-form">
      <h2 className="form-title">{title}</h2>
      {fields.map((field) => (
        <div className="form-group" key={field.name}>
          <label>{field.label}</label>
          <input 
            type={field.type || "text"} 
            name={field.name} 
            value={field.value || ''} 
            onChange={onChange} 
            required={field.required !== false} 
            className="form-input"
          />
        </div>
      ))}
      <button type="submit" className="form-button">{buttonLabel}</button>
    </form>
  );
};

export default UserForm;