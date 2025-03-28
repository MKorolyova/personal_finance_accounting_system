export const patterns = {
    USER: {
      SIGN_UP: { cmd: 'sign_up_user' },
      LOG_IN: { cmd: 'log_in_user' },
      UPDATE: { cmd: 'update_user' },
      DELETE: { cmd: 'delete_user' },
      FIND_BY_EMAIL: { cmd: 'find_user_by_email' },
      FIND_BY_ID: { cmd: 'find_user_by_id' },
      FIND_ALL: { cmd: 'find_all' },

    },
    TRANSACTION:{
      FIND_ALL: { cmd: 'find_all_users_transactions' },
      DELETE: { cmd: 'delete_users_transaction' },
      CREATE: { cmd: 'create_new_user_transaction' },
      SUMMARY: { cmd: 'get_summary_of_all_users_transactions' },
      FIND_WITH_FILTERS : { cmd: 'find_all_users_transactions_with_filters' },
    }
  };
