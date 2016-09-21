require 'test_helper'

class BinariesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get binaries_index_url
    assert_response :success
  end

  test "should get show" do
    get binaries_show_url
    assert_response :success
  end

end
