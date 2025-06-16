import sqlite3

conn = sqlite3.connect('customers.db')
c = conn.cursor()

c.execute('''
    CREATE TABLE IF NOT EXISTS customers (
        customer_id INTEGER PRIMARY KEY,
        name TEXT,
        gender TEXT,
        location TEXT
    )
''')

sample_data = [
    (1, 'Ananya Sharma', 'Female', 'Mumbai'),
    (2, 'Rohan Verma', 'Male', 'Delhi'),
    (3, 'Priya Menon', 'Female', 'Bangalore'),
    (4, 'Arjun Singh', 'Male', 'Mumbai'),
    (5, 'Sneha Patel', 'Female', 'Ahmedabad'),
    (6, 'Amit Kumar', 'Male', 'Chennai'),
    (7, 'Nisha Reddy', 'Female', 'Hyderabad'),
    (8, 'Vikas Joshi', 'Male', 'Pune'),
    (9, 'Sunita Iyer', 'Female', 'Kolkata'),
    (10, 'Ajay Mehra', 'Male', 'Jaipur'),
    (11, 'Deepika Singh', 'Female', 'Lucknow'),
    (12, 'Rahul Jain', 'Male', 'Indore'),
    (13, 'Meena Kumari', 'Female', 'Patna'),
    (14, 'Siddharth Roy', 'Male', 'Bhubaneswar'),
    (15, 'Divya Agarwal', 'Female', 'Nagpur'),
    (16, 'Manish Tiwari', 'Male', 'Kanpur'),
    (17, 'Shruti Desai', 'Female', 'Vadodara'),
    (18, 'Harshad Shah', 'Male', 'Surat'),
    (19, 'Kavita Nair', 'Female', 'Kochi'),
    (20, 'Girish Rao', 'Male', 'Mysore'),
    (21, 'Pooja Shetty', 'Female', 'Udupi'),
    (22, 'Sachin Pillai', 'Male', 'Trivandrum'),
    (23, 'Monica Fernandes', 'Female', 'Goa'),
    (24, 'Ritesh Gupta', 'Male', 'Guwahati'),
    (25, 'Neha Saxena', 'Female', 'Bhopal'),
    (26, 'Parth Deshmukh', 'Male', 'Nashik'),
    (27, 'Sonal Sharma', 'Female', 'Jodhpur'),
    (28, 'Vinod Yadav', 'Male', 'Gurgaon'),
    (29, 'Ishita Sen', 'Female', 'Noida'),
    (30, 'Rajeev Ranjan', 'Male', 'Ranchi'),
    (31, 'Tanvi Mittal', 'Female', 'Chandigarh'),
    (32, 'Puneet Kapoor', 'Male', 'Ludhiana'),
    (33, 'Rupal Shah', 'Female', 'Rajkot'),
    (34, 'Samir Patel', 'Male', 'Bhavnagar'),
    (35, 'Zoya Ansari', 'Female', 'Agra'),
    (36, 'Prakash Mishra', 'Male', 'Varanasi'),
    (37, 'Simran Kaur', 'Female', 'Amritsar'),
    (38, 'Rohit Sinha', 'Male', 'Dhanbad'),
    (39, 'Preeti Dubey', 'Female', 'Allahabad'),
    (40, 'Sandeep Singh', 'Male', 'Jalandhar'),
    (41, 'Kirti Sood', 'Female', 'Ambala'),
    (42, 'Vivek Sharma', 'Male', 'Meerut'),
    (43, 'Radhika Sharma', 'Female', 'Gwalior'),
    (44, 'Mukesh Kumar', 'Male', 'Rohtak'),
    (45, 'Ayesha Khan', 'Female', 'Aligarh'),
    (46, 'Ravi Raj', 'Male', 'Jamshedpur'),
    (47, 'Kiran Bala', 'Female', 'Raipur'),
    (48, 'Yogesh Joshi', 'Male', 'Dehradun'),
    (49, 'Snehal Chavan', 'Female', 'Aurangabad'),
    (50, 'Shubham Patil', 'Male', 'Solapur'),
    (51, 'Aarti Jain', 'Female', 'Guntur'),
    (52, 'Arvind Swamy', 'Male', 'Salem'),
    (53, 'Madhu Kumari', 'Female', 'Mangalore'),
    (54, 'Lakshmi Rao', 'Female', 'Vijayawada'),
    (55, 'Ajith Menon', 'Male', 'Kollam'),
    (56, 'Vishal Bansal', 'Male', 'Panipat'),
    (57, 'Ruchi Gupta', 'Female', 'Hisar'),
    (58, 'Aman Sinha', 'Male', 'Durgapur'),
    (59, 'Barkha Singh', 'Female', 'Siliguri'),
    (60, 'Utkarsh Jain', 'Male', 'Haridwar'),
]
c.executemany('INSERT OR REPLACE INTO customers VALUES (?, ?, ?, ?)', sample_data)
conn.commit()
conn.close()

print("Database seeded!")
