import { Meteor } from 'meteor/meteor';
import React from 'react'
import { useTracker } from 'meteor/react-meteor-data';

export const UserListPage = () => {

  const userListLoading = useTracker(() => {
    const userSub = Meteor.subscribe('admin.users.all');
    return !userSub.ready();
  }, [])

  return (
    <div>User list is {!userListLoading && 'loaded'}</div>
  )
}