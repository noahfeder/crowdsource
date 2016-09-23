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

class Binary < ApplicationRecord
  belongs_to :user
end
