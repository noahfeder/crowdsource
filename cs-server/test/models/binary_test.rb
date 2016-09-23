# == Schema Information
#
# Table name: binaries
#
#  id         :integer          not null, primary key
#  user_id    :integer
#  active     :boolean
#  name       :string
#  content    :text
#  votesA     :integer
#  votesB     :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  choiceA    :string
#  choiceB    :string
#  expiration :string
#

require 'test_helper'

class BinaryTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
