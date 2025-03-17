import React from 'react'
import DataTable from '../dataTable/DataTable'
import { usersActions, usersColumns, usersData } from '@/lib/content/users.content'

const UsersTable = () => {
  return (
    <DataTable
        columns={usersColumns}
        data={usersData}
        actions={usersActions}
    />
  )
}

export default UsersTable
