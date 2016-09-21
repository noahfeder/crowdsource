Binary.destroy_all
User.destroy_all

@user = User.create({
  fname: "Noah", lname: "Feder",
  email: "noah.feder@gmail.com",
  username: "stavro510", active: true
  })
@user.password = "asdf"
@user.save

10.times do
  @user.binaries.create({
    active: true, name: Faker::Hipster.word,
    content: Faker::Hipster.sentences(2),
    votesA: Faker::Number.number(2),
    votesB: Faker::Number.number(2)
    })
end

puts "Created #{User.count} users and #{Binary.count} binaries"
