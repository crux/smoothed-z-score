# pseudocode

```java
# Let y be a vector of timeseries data of at least length lag+2
# Let mean() be a function that calculates the mean
# Let std() be a function that calculates the standard deviaton
# Let absolute() be the absolute value function

# Settings (the ones below are examples: choose what is best for your data)
set lag to 5;          # lag 5 for the smoothing functions
set threshold to 3.5;  # 3.5 standard deviations for signal
set influence to 0.5;  # between 0 and 1, where 1 is normal influence, 0.5 is half

# Initialise variables
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
    # Make influence lower
    set filteredY(i) to influence*y(i) + (1-influence)*filteredY(i-1);
  else
    set signals(i) to 0;                        # No signal
    set filteredY(i) to y(i);
  end
  # Adjust the filters
  set avgFilter(i) to mean(filteredY(i-lag),...,filteredY(i));
  set stdFilter(i) to std(filteredY(i-lag),...,filteredY(i));
end
```
