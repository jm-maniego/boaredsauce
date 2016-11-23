class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :polls

  def initials
    fname_a, fname_b = first_name.split(/\s/)[0..1]
    fname_b ||= fname_a[1]
    [fname_a, fname_b].map(&:first).join.upcase
  end

  def full_name
    "#{first_name} #{last_name}"
  end

  def url
    full_name
  end
end
