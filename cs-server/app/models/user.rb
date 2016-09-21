class User < ApplicationRecord
  has_many :binaries
  has_secure_password
end
