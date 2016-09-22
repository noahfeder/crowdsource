# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  fname           :string
#  lname           :string
#  email           :string
#  password_digest :string
#  username        :string
#  active          :boolean
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ApplicationRecord
  has_many :binaries
  has_secure_password
end
