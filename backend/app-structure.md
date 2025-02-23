1: people could get an end-to-end flight booking
2: they could search for flight integerated with data selection, 
number of persons, 
class: Economy, Premium economy, Business, First
they could select the starting desitination, and end distination
and finally search for that

2: we should have different filter choice:
. number of stops
. airlines
. bagages
. price range
. time range

3: we should have the sort option:
. by price
. duration time
. arival time

4: adding constraints:
. if there is one set, customer should not allowed to book 3 sets
. price calculation for sets
. sending notification once custorme booked the flight
. 48 hours before flight time, customer should complete his online boarding
. after completing boarding, mail ticket to custormer
. option to cancel the boarding
. update user regarding any delay in flight time

================================= After our first curd adding airplane ============================

1: we created airplane-middleware to handle the correct error of 400-bad request instead of 500 which was by default, which occurs when the use send null-value for 'modelNumber' or wrong format of input.

Why we did that:
. because the 'null value or wrong format is a client mistacke or a bad request its not a server errror that should error with status-code of 500, it should error with status-code of-400 which is a bad-request status-code'.

2: create error-class 'app-error.js' which is an app-erro-class at: utils/errors
why we did that:
. to make the error-response more consistence, while many number of dev work on the same project there should not be different error response which cause confiusion.

3: create error-response && success-response object insid the: utils/common directory
why we did that:
. to avoid writing raw message in our application
