export const patterns = {
  TRANSACTION:{
    DELETE: { cmd: 'delete_users_transaction' },
    CREATE: { cmd: 'create_new_user_transaction' },
    SUMMARY: { cmd: 'get_summary_of_all_users_transactions' },
    FIND_WITH_FILTERS : { cmd: 'find_all_users_transactions_with_filters' },
    FIND_WITH_FILTERS_FOR_ANALYTICS : { cmd: 'find_all_users_transactions_sum_per_day_with_filters_for_analytics' },
    UPDATE_TRANSACTION : {cmd : 'update_users_transaction'}
  }
  };
