# Peak signal detection in realtime timeseries data

### This is just a javascript transcription of the algorithm pseudocode given in the
referenced article put in node npm package:

 - https://stackoverflow.com/questions/22583391/peak-signal-detection-in-realtime-timeseries-data

### Please refer to the above URL for documentation of functionallity and proper parameterization.


# Useage
## CLI 
### install
```bash
npm install --global @joe_six/smoothed-z-score-peak-signal-detection
```

### Included with this module is a command line example and a sample data file
(date from the above stackoverflow URL) to show it working:
```bash
smoothed-z-score-demo
```
## or:
```bash
smoothed-z-score-demo test-data.csv
```
![image](https://user-images.githubusercontent.com/29699356/146650239-e214ec95-45e3-4191-ac1c-5e7269df2402.png)
## Require 

## Installation
### available as npm package:
```bash
npm install --save @joe_six/smoothed-z-score-peak-signal-detection
```
![image](https://user-images.githubusercontent.com/29699356/146650700-b76bf6c5-d61c-4091-9c80-fb5e539f75a3.png)

#### create a file called `main.js` and paste the following in the file
```javascript
const smoothed_z_score = require("@joe_six/smoothed-z-score-peak-signal-detection")

let samples = [1, 1, 1.1, 1, 0.9, 1, 1, 1.1, 1, 0.9, 1, 1.1, 1, 1, 0.9, 1, 1, 1.1, 1, 1, 1, 1, 1.1, 0.9, 1, 1.1, 1, 1, 0.9, 1, 1.1, 1, 1, 1.1, 1, 0.8, 0.9, 1, 1.2, 0.9, 1, 1, 1.1, 1.2, 1, 1.5, 1, 3, 2, 5, 3, 2, 1, 1, 1, 0.9, 1, 1, 3, 2.6, 4, 3, 3.2, 2, 1, 1, 0.8, 4, 4, 2, 2.5, 1, 1, 1]
const peaks = smoothed_z_score(samples, {lag: 5})// , {influence: 87})
console.log(peaks.length + ": " + peaks.toString())
```
## run the code
```bash
node .\main.js
```
![image](https://user-images.githubusercontent.com/29699356/146650686-ed8ef694-0810-4a84-9641-98376100a7c8.png)

## Enjoy!

# Sudo code for the algorithm
```ruby
# Let y be a vector of timeseries data of at least length lag+2
# Let mean() be a function that calculates the mean
# Let std() be a function that calculates the standard deviaton
# Let absolute() be the absolute value function

# Settings (the ones below are examples: choose what is best for your data)
set lag to 5;          # lag 5 for the smoothing functions
set threshold to 3.5;  # 3.5 standard deviations for signal
set influence to 0.5;  # between 0 and 1, where 1 is normal influence, 0.5 is half

# Initialize variables
set signals to vector 0,...,0 of length of y;   # Initialize signal results
set filteredY to y(1),...,y(lag)                # Initialize filtered series
set avgFilter to null;                          # Initialize average filter
set stdFilter to null;                          # Initialize std. filter
set avgFilter(lag) to mean(y(1),...,y(lag));    # Initialize first value
set stdFilter(lag) to std(y(1),...,y(lag));     # Initialize first value

for i=lag+1,...,t do
  if absolute(y(i) - avgFilter(i-1)) > threshold*stdFilter(i-1) then
    if y(i) > avgFilter(i-1) then
      set signals(i) to +1;                     # Positive signal
    else
      set signals(i) to -1;                     # Negative signal
    end
    set filteredY(i) to influence*y(i) + (1-influence)*filteredY(i-1);
  else
    set signals(i) to 0;                        # No signal
    set filteredY(i) to y(i);
  end
  set avgFilter(i) to mean(filteredY(i-lag+1),...,filteredY(i));
  set stdFilter(i) to std(filteredY(i-lag+1),...,filteredY(i));
end
```

##### Author Note: for the data I actually had I could not really use it.. ;(
