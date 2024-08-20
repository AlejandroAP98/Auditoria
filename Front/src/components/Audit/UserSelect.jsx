import PropTypes from 'prop-types';
import './Audit.css'

const UserSelector = ({ users, selectedUsers, onSelect }) => {
    const handleChange = (event) => {
        const options = event.target.options;
        const values = Array.from(options)
            .filter(option => option.selected)
            .map(option => option.value);

        onSelect(values);
    };

    return (
        <div className='userSelect'>
            <label>Seleccione usuario</label>
            <select
                value={selectedUsers}
                onChange={handleChange}
                className='userOptions'

            >
                {users.map(user => (
                    <option key={user.id} value={user.id}>
                        {user.name} {user.last_name} - {user.document_number}
                    </option>
                ))}
            </select>
        </div>
    );
};

UserSelector.propTypes = {
    users: PropTypes.array.isRequired,
    selectedUsers: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
};

export default UserSelector;


