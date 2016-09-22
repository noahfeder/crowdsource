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

require 'test_helper'

class UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
