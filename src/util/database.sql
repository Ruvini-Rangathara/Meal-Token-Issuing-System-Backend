
CREATE TABLE item (
                      id SERIAL PRIMARY KEY,
                      price NUMERIC(10, 2),
                      name VARCHAR(100),
                      picture VARCHAR(100)
);

CREATE TABLE meal (
                      id SERIAL PRIMARY KEY,
                      token VARCHAR(255) NOT NULL,
                      totalPrice NUMERIC(10, 2) NOT NULL
);

CREATE TABLE item_in_meal (
                              id SERIAL PRIMARY KEY,
                              mealId INT NOT NULL,
                              itemId INT NOT NULL,
                              price NUMERIC(10, 2) NOT NULL,
                              FOREIGN KEY (mealId) REFERENCES meal(id),
                              FOREIGN KEY (itemId) REFERENCES item(id)
);


SELECT * FROM item;
SELECT * FROM meal;
SELECT * FROM item_in_meal;


-- Sample data for Item entity
INSERT INTO item (price, name, picture) VALUES
                                            (300, 'Burger', 'burger.jpg'),
                                            (1000, 'Pizza', 'pizza.jpg'),
                                            (200, 'Salad', 'salad.jpg'),
                                            (400, 'Sandwich', 'sandwich.jpg'),
                                            (800, 'Pasta', 'pasta.jpg'),
                                            (250, 'Soup', 'soup.jpg');

-- Sample data for Meal entity
INSERT INTO meal (token, "totalPrice") VALUES
                                         ('EATO-20240427-233', 1300),
                                         ('EATO-20240427-343', 200),
                                         ('EATO-20240427-123', 500),
                                         ('EATO-20240428-456', 1050),
                                         ('EATO-20240428-789', 750),
                                         ('EATO-20240429-101', 1450);

-- Sample data for ItemInMeal entity
INSERT INTO item_in_meal ("mealId", "itemId", price) VALUES
                                                     (1, 1, 300),
                                                     (1, 2, 1000),
                                                     (1, 3, 200),
                                                     (2, 3, 200),
                                                     (3, 1, 300),
                                                     (3, 3, 200),
                                                     (4, 1, 300),
                                                     (4, 4, 400),
                                                     (5, 2, 1000),
                                                     (5, 5, 250),
                                                     (6, 2, 1000),
                                                     (6, 4, 400),
                                                     (6, 6, 800);
