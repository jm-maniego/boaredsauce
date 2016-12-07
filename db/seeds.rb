# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

jm = User.find_or_create_by(email: 'jmmaniego@hotmail.com') do |user|
  user.first_name = "Juan Miguel"
  user.last_name  = "Maniego"
  password = user.password = 'p@ssword'
end

poll_choices = [
  "Yes",
  "No",
  "Maybe"
].map {|choice| {text: choice} }

polls = [
  "Who let the dogs out?",
  "Do we need another social polling app?",
  "Am I doing it right?",
  "Popcorn anyone?",
  "Who's your daddy?"
].map {|poll_text| {text: poll_text, poll_choices_attributes: poll_choices}}

Poll.create!(polls) do |poll|
  poll.user = jm
end
