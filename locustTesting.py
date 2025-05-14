from locust import HttpUser, task, between
from datetime import datetime, timedelta
import random

class WebsiteUser(HttpUser):
    wait_time = between(1, 3)
    token = None
    headers = {}

    def on_start(self):
        with self.client.post("/api/auth/login", json={
            "email": "test@test.com",
            "password": "test"
        }, catch_response=True) as response:
            
            print("Status code:", response.status_code)
            if response.status_code == 201:
                try:
                    if 'access_token' in response.json():
                        self.token = response.json()['access_token']
                        self.headers = {
                            "Authorization": f"Bearer {self.token}",
                            "Content-Type": "application/json"
                        }
                        response.success()
                except ValueError:
                    print("Ошибка: ответ не JSON")
            else:
                print("Ошибка от сервера:", response.status_code)




    @task
    def get_goals(self):
        self.client.get("/api/goal/", headers=self.headers)

    @task
    def get_month_summary(self):
        self.client.get("/api/transaction/monthSummary", headers=self.headers)

    @task
    def get_filtered_transactions(self):
        filter_data = {
            "type": ["expense"],
            "category": ["groceries"],
            "transactionStartDate": (datetime.now() - timedelta(days=7)).date().isoformat(),
            "transactionEndDate": datetime.now().date().isoformat() 
        }
        self.client.post("/api/transaction/filtered", json=filter_data, headers=self.headers)

    @task
    def analytics_filtered(self):
        filter_data = {
            "type": ["expense"],
            "category": ["groceries"],
            "transactionStartDate":(datetime.now() - timedelta(days=7)).date().isoformat(),
            "transactionEndDate": datetime.now().date().isoformat() 
        }
        self.client.post("/api/transaction/analytics/filtered", json=filter_data, headers=self.headers)

#python3.11 -m locust -f client.py