import React from 'react'

const UsersForm = ({ passwordForm, editUser }) => {
    return (
        <div>
            {
                passwordForm ? (
                    <p>Change Password</p>
                ) : editUser ? (
                    <p>Edit User</p>
                ) : (
                    <p>New User</p>
                )
            }

        </div>
    )
}

export default UsersForm
