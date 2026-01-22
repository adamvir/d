##############
# Homework 05
#

# Clear memory
rm(list=ls())

library(fixest)
library(readr)
library(dplyr)

# Import data
# from OSF import wms data
df <- read_csv( "https://osf.io/uzpce/download" )


##
# Task 1)
# Filter to 2013 and report the number of duplicates given by wave, country and firmid
df <- df %>% filter(wave == 2013)
num_dup <- df %>%
  group_by(wave, country, firmid) %>%
  filter(n() > 1) %>%
  nrow()

##
# Task 2)  Filter out these duplicates and report the number of missing observations from firm size,
#   based `emp_firm` variable
df <- df %>% distinct(wave, country, firmid, .keep_all = TRUE)
num_miss_firm <- sum(is.na(df$emp_firm))

##
# Task 3)  Filter for firms with more or equal to 100 and less or equal to 5000
#   drop missings as well. Report the median firm size
df <- df %>% filter(!is.na(emp_firm), emp_firm >= 100, emp_firm <= 5000)
med_firmsize <- median(df$emp_firm)

##
# Task 4) Calculate the average management score, using `lean`, `perf` and `talent` variables
#     and report the mean
df <- df %>%
  mutate(lean = (lean1 + lean2) / 2,
         perf = rowMeans(select(., starts_with("perf")), na.rm = TRUE),
         talent = rowMeans(select(., starts_with("talent")), na.rm = TRUE),
         avg_score = (lean + perf + talent) / 3)
mean_avg_score <- mean(df$avg_score, na.rm = TRUE)


##
# Task 5) Calculate the z-score and report the standard deviation
df <- df %>% mutate(z_score = (avg_score - mean(avg_score, na.rm = TRUE)) / sd(avg_score, na.rm = TRUE))
sd_zscore <- sd(df$z_score, na.rm = TRUE)

##
# Task 6) Do the regression for ` z_score = alpha + beta * ln( emp_firm )` and report beta
#   along with heteroskedastic robust SEs.
m1 <- feols(z_score ~ log(emp_firm), data = df, vcov = "hetero")
beta <- coef(m1)[2]
beta_se <- se(m1)[2]

##
# Task 7) Do the regression for for `avg_score = alpha2 + beta2 * ln( emp_firm )` and report beta2
#   along with heteroskedastic robust SEs.
m2 <- feols(avg_score ~ log(emp_firm), data = df, vcov = "hetero")
beta2 <- coef(m2)[2]
beta2_se <- se(m2)[2]

##
# Task 8) Divide beta2 by the standard deviation of avg_score
# What number do you get? How is it related to beta? What is your explanation?
scaled_beta2 <- beta2 / sd(df$avg_score, na.rm = TRUE)

# Results:
# Task 1 - num_dup: 2
# Task 2 - num_miss_firm: 0
# Task 3 - med_firmsize: 280
# Task 4 - mean_avg_score: 2.763029
# Task 5 - sd_zscore: 1
# Task 6 - beta: 0.3621382, beta_se: 0.02546302
# Task 7 - beta2: 0.2103279, beta2_se: 0.01478879
# Task 8 - scaled_beta2: 0.3621382
#
# Magyarázat a Task 8-hoz:
# A scaled_beta2 megegyezik a beta-val! Ez azért van, mert a z_score nem más, mint
# a standardizált avg_score (átlag-centrált és elosztva az SD-vel). Amikor elosztjuk
# beta2-t az avg_score szórásával, lényegében ugyanarra a skálára konvertáljuk, mint
# a beta (ami a z_score-t használja). Ez azt mutatja, hogy a standardizálás az
# együtthatókat 1/SD arányban skálázza. 

