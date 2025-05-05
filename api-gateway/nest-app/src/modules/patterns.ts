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
      DELETE: { cmd: 'delete_users_transaction' },
      CREATE: { cmd: 'create_new_user_transaction' },
      SUMMARY: { cmd: 'get_summary_of_all_users_transactions' },
      FIND_WITH_FILTERS : { cmd: 'find_all_users_transactions_with_filters' },
      FIND_WITH_FILTERS_FOR_ANALYTICS : { cmd: 'find_all_users_transactions_sum_per_day_with_filters_for_analytics' },
      UPDATE_TRANSACTION : {cmd : 'update_users_transaction'}
    },

    GOAL:{
      FIND_ALL: { cmd: 'find_all_users_goals' },
      DELETE: { cmd: 'delete_users_goal' },
      CREATE: { cmd: 'create_new_user_goal' },
      UPDATE: { cmd: 'update_users_goal' },
      ADD_TO_CURRENT_AMOUNT: {cmd: 'add_to_current_amount'},
    }
  };
