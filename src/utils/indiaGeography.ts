export interface IndiaStateInfo {
  id: string;
  name: string;
  hindiName: string;
  type: 'State' | 'Union Territory';
  region: 'North' | 'West' | 'South' | 'East' | 'Central' | 'North-East' | 'Islands';
  capital: string;
  economicSpecialty: string;
  demandBonusLabel: string;
  cities: string[];
}

export const INDIA_STATES_AND_UTS: IndiaStateInfo[] = [
  // ======================== 28 STATES ========================
  {
    id: 'AP',
    name: 'Andhra Pradesh',
    hindiName: 'आंध्र प्रदेश',
    type: 'State',
    region: 'South',
    capital: 'Amaravati',
    economicSpecialty: 'Ports, Pharma, Aquaculture & Agro Mandi',
    demandBonusLabel: '+12% Port & Coastal Logistics',
    cities: [
      'Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Kurnool', 'Kakinada',
      'Rajamahendravaram', 'Tirupati', 'Kadapa', 'Anantapur', 'Eluru', 'Ongole',
      'Vizianagaram', 'Machilipatnam', 'Srikakulam', 'Chittoor', 'Hindupur',
      'Proddatur', 'Bhimavaram', 'Tenali', 'Amaravati', 'Nandyal', 'Adoni', 'Madanapalle'
    ],
  },
  {
    id: 'AR',
    name: 'Arunachal Pradesh',
    hindiName: 'अरुणाचल प्रदेश',
    type: 'State',
    region: 'North-East',
    capital: 'Itanagar',
    economicSpecialty: 'Hydropower, Timber, Horticulture & Border Trade',
    demandBonusLabel: '+10% Hill Supply Premium',
    cities: [
      'Itanagar', 'Naharlagun', 'Pasighat', 'Tawang', 'Ziro', 'Bomdila',
      'Tezu', 'Roing', 'Aalo (Along)', 'Changlang', 'Khonsa', 'Namsai',
      'Seppa', 'Daporijo', 'Yingkiong', 'Anini', 'Hawai'
    ],
  },
  {
    id: 'AS',
    name: 'Assam',
    hindiName: 'असम',
    type: 'State',
    region: 'North-East',
    capital: 'Dispur',
    economicSpecialty: 'Tea Estates, Oil & Petrochemicals, Silk & Bamboo',
    demandBonusLabel: '+14% North-East Gateway Hub',
    cities: [
      'Guwahati', 'Dispur', 'Silchar', 'Dibrugarh', 'Jorhat', 'Nagaon',
      'Tinsukia', 'Tezpur', 'Bongaigaon', 'Dhubri', 'Diphu', 'North Lakhimpur',
      'Karimganj', 'Sivasagar', 'Goalpara', 'Barpeta', 'Golaghat', 'Hailakandi',
      'Haflong', 'Dhemaji', 'Kokrajhar', 'Nalbari', 'Mangaldoi'
    ],
  },
  {
    id: 'BR',
    name: 'Bihar',
    hindiName: 'बिहार',
    type: 'State',
    region: 'East',
    capital: 'Patna',
    economicSpecialty: 'Agro Processing, Makhana, Maize Mandi & Retail Growth',
    demandBonusLabel: '+18% Mass Consumer Demand',
    cities: [
      'Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Purnia', 'Darbhanga',
      'Bihar Sharif', 'Arrah', 'Begusarai', 'Katihar', 'Munger', 'Chhapra',
      'Saharsa', 'Sasaram', 'Hajipur', 'Dehri', 'Siwan', 'Motihari',
      'Nawada', 'Bagaha', 'Buxar', 'Kishanganj', 'Sitamarhi', 'Jamalpur',
      'Jehanabad', 'Bettiah', 'Samastipur', 'Madhubani', 'Aurangabad (Bihar)', 'Khagaria'
    ],
  },
  {
    id: 'CG',
    name: 'Chhattisgarh',
    hindiName: 'छत्तीसगढ़',
    type: 'State',
    region: 'Central',
    capital: 'Raipur',
    economicSpecialty: 'Steel Plants, Coal, Power & Paddy Rice Bowl',
    demandBonusLabel: '-8% Heavy Steel & Energy Input',
    cities: [
      'Raipur', 'Bhilai', 'Bilaspur', 'Korba', 'Durg', 'Rajnandgaon',
      'Raigarh', 'Jagdalpur', 'Ambikapur', 'Dhamtari', 'Chirmiri', 'Bhatapara',
      'Mahasamund', 'Kawardha', 'Kanker', 'Dantewada', 'Janjgir-Champa', 'Naya Raipur'
    ],
  },
  {
    id: 'GA',
    name: 'Goa',
    hindiName: 'गोवा',
    type: 'State',
    region: 'West',
    capital: 'Panaji',
    economicSpecialty: 'Tourism Hospitality, Pharma Exports & Maritime Ports',
    demandBonusLabel: '+15% Luxury & Tourism Demand',
    cities: [
      'Panaji', 'Margao', 'Vasco da Gama', 'Mapusa', 'Ponda', 'Bicholim',
      'Curchorem', 'Sanquelim', 'Valpoi', 'Cuncolim', 'Quepem', 'Canacona', 'Mormugao'
    ],
  },
  {
    id: 'GJ',
    name: 'Gujarat',
    hindiName: 'गुजरात',
    type: 'State',
    region: 'West',
    capital: 'Gandhinagar',
    economicSpecialty: 'Petrochemicals, Diamonds, Textiles, Auto & Ports',
    demandBonusLabel: '+16% Industrial & Export Hub',
    cities: [
      'Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar',
      'Junagadh', 'Gandhinagar', 'Anand', 'Navsari', 'Morbi', 'Nadiad',
      'Surendranagar', 'Bharuch', 'Mehsana', 'Bhuj', 'Porbandar', 'Palanpur',
      'Valsad', 'Vapi', 'Gondal', 'Veraval', 'Godhra', 'Patan', 'Dahod',
      'Botad', 'Amreli', 'Ankleshwar', 'Mundra', 'Jamkhambhalia'
    ],
  },
  {
    id: 'HR',
    name: 'Haryana',
    hindiName: 'हरियाणा',
    type: 'State',
    region: 'North',
    capital: 'Chandigarh',
    economicSpecialty: 'Auto Manufacturing, NCR Tech, Textiles & Grain Mandi',
    demandBonusLabel: '+15% NCR Logistics Advantage',
    cities: [
      'Gurugram', 'Faridabad', 'Panipat', 'Ambala', 'Yamunanagar', 'Rohtak',
      'Hisar', 'Karnal', 'Sonipat', 'Panchkula', 'Bhiwani', 'Sirsa',
      'Bahadurgarh', 'Jind', 'Kurukshetra', 'Kaithal', 'Rewari', 'Palwal',
      'Narnaul', 'Fatehabad', 'Charkhi Dadri', 'Jhajjar', 'Manesar', 'Nuh'
    ],
  },
  {
    id: 'HP',
    name: 'Himachal Pradesh',
    hindiName: 'हिमाचल प्रदेश',
    type: 'State',
    region: 'North',
    capital: 'Shimla',
    economicSpecialty: 'Pharma Hub (Baddi), Apples, Hydropower & Eco-Tourism',
    demandBonusLabel: '+12% Pharma & Orchard Hub',
    cities: [
      'Shimla', 'Dharamshala', 'Solan', 'Mandi', 'Palampur', 'Baddi',
      'Nahan', 'Paonta Sahib', 'Sundarnagar', 'Chamba', 'Una', 'Kullu',
      'Manali', 'Hamirpur', 'Bilaspur (HP)', 'Keylong', 'Reckong Peo', 'Kangra'
    ],
  },
  {
    id: 'JH',
    name: 'Jharkhand',
    hindiName: 'झारखंड',
    type: 'State',
    region: 'East',
    capital: 'Ranchi',
    economicSpecialty: 'Tata Steel Belt, Coal Mining & Heavy Engineering',
    demandBonusLabel: '-10% Mineral & Metal Cost',
    cities: [
      'Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro Steel City', 'Deoghar',
      'Phusro', 'Hazaribagh', 'Giridih', 'Ramgarh', 'Medininagar (Daltonganj)',
      'Chirkunda', 'Chaibasa', 'Dumka', 'Sahibganj', 'Gumla', 'Godda',
      'Lohardaga', 'Jamtara', 'Koderma'
    ],
  },
  {
    id: 'KA',
    name: 'Karnataka',
    hindiName: 'कर्नाटक',
    type: 'State',
    region: 'South',
    capital: 'Bengaluru',
    economicSpecialty: 'IT Capital, Aerospace, Coffee, Silk & Heavy Robotics',
    demandBonusLabel: '+18% Tech & Premium Urban Spend',
    cities: [
      'Bengaluru', 'Mysuru', 'Hubballi-Dharwad', 'Mangaluru', 'Belagavi',
      'Kalaburagi (Gulbarga)', 'Davanagere', 'Ballari', 'Vijayapura', 'Shivamogga',
      'Tumakuru', 'Raichur', 'Bidar', 'Hosapete', 'Gadag-Betageri', 'KGF',
      'Hassan', 'Bhadravati', 'Chitradurga', 'Udupi', 'Kolar', 'Mandya',
      'Chikmagalur', 'Bagalkot', 'Karwar', 'Haveri', 'Kodagu (Madikeri)'
    ],
  },
  {
    id: 'KL',
    name: 'Kerala',
    hindiName: 'केरल',
    type: 'State',
    region: 'South',
    capital: 'Thiruvananthapuram',
    economicSpecialty: 'Spices, Rubber, Kochi Port, Tourism & Consumer Retail',
    demandBonusLabel: '+14% High Retail Purchasing Power',
    cities: [
      'Thiruvananthapuram', 'Kochi', 'Kozhikode (Calicut)', 'Kollam', 'Thrissur',
      'Kannur', 'Alappuzha', 'Kottayam', 'Palakkad', 'Malappuram', 'Manjeri',
      'Thalassery', 'Ponnani', 'Vatakara', 'Kanhangad', 'Kasaragod',
      'Pathanamthitta', 'Idukki', 'Kalpetta (Wayanad)', 'Guruvayur'
    ],
  },
  {
    id: 'MP',
    name: 'Madhya Pradesh',
    hindiName: 'मध्य प्रदेश',
    type: 'State',
    region: 'Central',
    capital: 'Bhopal',
    economicSpecialty: 'Soybean & Wheat Mandi, Pithampur Auto & Central Hub',
    demandBonusLabel: '-8% Pan-India Central Freight',
    cities: [
      'Indore', 'Bhopal', 'Jabalpur', 'Gwalior', 'Ujjain', 'Sagar', 'Dewas',
      'Satna', 'Ratlam', 'Rewa', 'Katni', 'Singrauli', 'Burhanpur', 'Khandwa',
      'Bhind', 'Chhindwara', 'Guna', 'Shivpuri', 'Vidisha', 'Chhatarpur',
      'Damoh', 'Mandsaur', 'Khargone', 'Neemuch', 'Pithampur', 'Narmadapuram',
      'Itarsi', 'Sehore', 'Betul', 'Seoni', 'Datia', 'Morena', 'Shahdol', 'Mandla'
    ],
  },
  {
    id: 'MH',
    name: 'Maharashtra',
    hindiName: 'महाराष्ट्र',
    type: 'State',
    region: 'West',
    capital: 'Mumbai',
    economicSpecialty: 'Dalal Street Finance, Auto, IT, Cotton Mandi & JNPT Port',
    demandBonusLabel: '+20% Financial Capital Advantage',
    cities: [
      'Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik', 'Chhatrapati Sambhajinagar',
      'Solapur', 'Kolhapur', 'Amravati', 'Navi Mumbai', 'Vasai-Virar',
      'Kalyan-Dombivli', 'Sangli', 'Jalgaon', 'Akola', 'Latur', 'Dhule',
      'Ahilyanagar (Ahmednagar)', 'Chandrapur', 'Parbhani', 'Ichalkaranji', 'Jalna',
      'Panvel', 'Satara', 'Beed', 'Yavatmal', 'Gondia', 'Wardha', 'Dharashiv',
      'Ratnagiri', 'Sindhudurg', 'Nanded', 'Baramati', 'Bhiwandi'
    ],
  },
  {
    id: 'MN',
    name: 'Manipur',
    hindiName: 'मणिपुर',
    type: 'State',
    region: 'North-East',
    capital: 'Imphal',
    economicSpecialty: 'Handloom, Bamboo Craft & Myanmar Border Trade',
    demandBonusLabel: '+11% Handloom & Border Corridor',
    cities: [
      'Imphal', 'Thoubal', 'Bishnupur', 'Churachandpur', 'Kakching', 'Ukhrul',
      'Senapati', 'Tamenglong', 'Jiribam', 'Moreh', 'Kangpokpi', 'Chandel'
    ],
  },
  {
    id: 'ML',
    name: 'Meghalaya',
    hindiName: 'मेघालय',
    type: 'State',
    region: 'North-East',
    capital: 'Shillong',
    economicSpecialty: 'Limestone, Spices, Eco-Tourism & Education Hub',
    demandBonusLabel: '+10% Hill Retail Margin',
    cities: [
      'Shillong', 'Tura', 'Jowai', 'Nongpoh', 'Williamnagar', 'Nongstoin',
      'Baghmara', 'Resubelpara', 'Ampati', 'Khliehriat', 'Mawkyrwat', 'Cherrapunji (Sohra)'
    ],
  },
  {
    id: 'MZ',
    name: 'Mizoram',
    hindiName: 'मिजोरम',
    type: 'State',
    region: 'North-East',
    capital: 'Aizawl',
    economicSpecialty: 'Bamboo Products, Horticulture & Kaladan Trade Route',
    demandBonusLabel: '+10% Frontier Market',
    cities: [
      'Aizawl', 'Lunglei', 'Saiha', 'Champhai', 'Kolasib', 'Serchhip',
      'Lawngtlai', 'Mamit', 'Saitual', 'Khawzawl', 'Hnahthial'
    ],
  },
  {
    id: 'NL',
    name: 'Nagaland',
    hindiName: 'नागालैंड',
    type: 'State',
    region: 'North-East',
    capital: 'Kohima',
    economicSpecialty: 'Agro-Forestry, Organic Spices & Commercial Dimapur Hub',
    demandBonusLabel: '+11% Organic & Artisan Demand',
    cities: [
      'Kohima', 'Dimapur', 'Mokokchung', 'Tuensang', 'Wokha', 'Zunheboto',
      'Mon', 'Phek', 'Kiphire', 'Longleng', 'Peren', 'Chümoukedima'
    ],
  },
  {
    id: 'OD',
    name: 'Odisha',
    hindiName: 'ओडिशा',
    type: 'State',
    region: 'East',
    capital: 'Bhubaneswar',
    economicSpecialty: 'Aluminium, Steel, Paradip Port & Coastal IT Corridor',
    demandBonusLabel: '-9% Metals & Minerals Input',
    cities: [
      'Bhubaneswar', 'Cuttack', 'Rourkela', 'Berhampur', 'Sambalpur', 'Puri',
      'Balasore', 'Bhadrak', 'Baripada', 'Jharsuguda', 'Jeypore', 'Angul',
      'Bargarh', 'Paradip', 'Rayagada', 'Koraput', 'Dhenkanal', 'Keonjhar',
      'Sundargarh', 'Bolangir', 'Kendrapara'
    ],
  },
  {
    id: 'PB',
    name: 'Punjab',
    hindiName: 'पंजाब',
    type: 'State',
    region: 'North',
    capital: 'Chandigarh',
    economicSpecialty: 'Wheat/Rice Grain Mandi, Ludhiana Hosiery, Sports & Tractors',
    demandBonusLabel: '-10% Wholesale Mandi Rate',
    cities: [
      'Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda', 'Mohali (SAS Nagar)',
      'Hoshiarpur', 'Batala', 'Pathankot', 'Moga', 'Abohar', 'Malerkotla',
      'Khanna', 'Phagwara', 'Sri Muktsar Sahib', 'Barnala', 'Rajpura', 'Firozpur',
      'Kapurthala', 'Sangrur', 'Faridkot', 'Mansa', 'Gurdaspur', 'Rupnagar', 'Zirakpur'
    ],
  },
  {
    id: 'RJ',
    name: 'Rajasthan',
    hindiName: 'राजस्थान',
    type: 'State',
    region: 'West',
    capital: 'Jaipur',
    economicSpecialty: 'Marble, Cement, Solar Power, Gems & Heritage Tourism',
    demandBonusLabel: '+14% Luxury & Construction Boom',
    cities: [
      'Jaipur', 'Jodhpur', 'Kota', 'Bikaner', 'Ajmer', 'Udaipur', 'Bhilwara',
      'Alwar', 'Bharatpur', 'Sikar', 'Pali', 'Sri Ganganagar', 'Kishangarh',
      'Beawar', 'Hanumangarh', 'Dhaulpur', 'Sawai Madhopur', 'Churu', 'Jhunjhunu',
      'Baran', 'Chittorgarh', 'Nagaur', 'Bundi', 'Barmer', 'Jaisalmer',
      'Banswara', 'Tonk', 'Jhalawar', 'Sirohi', 'Bhiwadi', 'Neemrana'
    ],
  },
  {
    id: 'SK',
    name: 'Sikkim',
    hindiName: 'सिक्किम',
    type: 'State',
    region: 'North-East',
    capital: 'Gangtok',
    economicSpecialty: '100% Organic Farming, Pharma Units & Himalayan Tourism',
    demandBonusLabel: '+12% Organic Pharma Hub',
    cities: [
      'Gangtok', 'Namchi', 'Gyalshing', 'Mangan', 'Rangpo', 'Singtam',
      'Jorethang', 'Soreng', 'Pakyong', 'Ravangla', 'Pelling'
    ],
  },
  {
    id: 'TN',
    name: 'Tamil Nadu',
    hindiName: 'तमिलनाडु',
    type: 'State',
    region: 'South',
    capital: 'Chennai',
    economicSpecialty: 'Detroit of India (Auto), Textiles, Leather, SaaS & 3 Major Ports',
    demandBonusLabel: '+17% Industrial Assembly Power',
    cities: [
      'Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli (Trichy)', 'Salem',
      'Tirunelveli', 'Tiruppur', 'Vellore', 'Erode', 'Thoothukudi', 'Dindigul',
      'Thanjavur', 'Ranipet', 'Sivakasi', 'Karur', 'Udhagamandalam (Ooty)',
      'Hosur', 'Nagercoil', 'Kanchipuram', 'Karaikudi', 'Neyveli', 'Cuddalore',
      'Kumbakonam', 'Tiruvannamalai', 'Pollachi', 'Rajapalayam', 'Pudukkottai',
      'Nagapattinam', 'Villupuram', 'Namakkal', 'Sriperumbudur'
    ],
  },
  {
    id: 'TG',
    name: 'Telangana',
    hindiName: 'तेलंगाना',
    type: 'State',
    region: 'South',
    capital: 'Hyderabad',
    economicSpecialty: 'Pharma Capital, Aerospace, Genome Valley & IT Corridor',
    demandBonusLabel: '+16% High-Margin Tech & Pharma',
    cities: [
      'Hyderabad', 'Warangal', 'Nizamabad', 'Khammam', 'Karimnagar', 'Ramagundam',
      'Mahbubnagar', 'Nalgonda', 'Adilabad', 'Suryapet', 'Miryalaguda',
      'Siddipet', 'Jagtial', 'Mancherial', 'Kothagudem', 'Kamareddy',
      'Bhongir', 'Sangareddy', 'Medak', 'Vikarabad', 'Secunderabad'
    ],
  },
  {
    id: 'TR',
    name: 'Tripura',
    hindiName: 'त्रिपुरा',
    type: 'State',
    region: 'North-East',
    capital: 'Agartala',
    economicSpecialty: 'Natural Rubber, Bamboo, Gas Power & Bangladesh Trade',
    demandBonusLabel: '+10% Rubber & Border Hub',
    cities: [
      'Agartala', 'Udaipur (Tripura)', 'Dharmanagar', 'Kailasahar', 'Belonia',
      'Khowai', 'Ambassa', 'Bishalgarh', 'Sonamura', 'Teliamura', 'Sabroom'
    ],
  },
  {
    id: 'UP',
    name: 'Uttar Pradesh',
    hindiName: 'उत्तर प्रदेश',
    type: 'State',
    region: 'North',
    capital: 'Lucknow',
    economicSpecialty: 'ODOP Crafts, Noida Electronics, Sugar/Agri Mandi & Mega Retail',
    demandBonusLabel: '+20% Largest Consumer Market',
    cities: [
      'Lucknow', 'Kanpur', 'Noida', 'Greater Noida', 'Ghaziabad', 'Agra',
      'Meerut', 'Varanasi', 'Prayagraj', 'Bareilly', 'Aligarh', 'Moradabad',
      'Saharanpur', 'Gorakhpur', 'Firozabad', 'Jhansi', 'Muzaffarnagar',
      'Mathura', 'Ayodhya', 'Rampur', 'Shahjahanpur', 'Farrukhabad', 'Etawah',
      'Mirzapur', 'Bulandshahr', 'Sambhal', 'Amroha', 'Hardoi', 'Fatehpur',
      'Raebareli', 'Orai', 'Sitapur', 'Bahraich', 'Unnao', 'Jaunpur',
      'Lakhimpur Kheri', 'Hathras', 'Banda', 'Pilibhit', 'Barabanki', 'Gonda',
      'Basti', 'Azamgarh', 'Ballia', 'Sultanpur', 'Pratapgarh', 'Deoria',
      'Bijnor', 'Mainpuri', 'Etah', 'Kasganj', 'Budaun', 'Hapur', 'Shamli',
      'Baghpat', 'Amethi', 'Kushinagar', 'Ghazipur', 'Mau', 'Sonbhadra'
    ],
  },
  {
    id: 'UK',
    name: 'Uttarakhand',
    hindiName: 'उत्तराखंड',
    type: 'State',
    region: 'North',
    capital: 'Dehradun',
    economicSpecialty: 'SIIDCUL Industrial Estates (Haridwar/Rudrapur) & Wellness',
    demandBonusLabel: '+12% Industrial Estate Tax Perk',
    cities: [
      'Dehradun', 'Haridwar', 'Roorkee', 'Haldwani', 'Rudrapur', 'Kashipur',
      'Rishikesh', 'Nainital', 'Pithoragarh', 'Almora', 'Kotdwar', 'Mussoorie',
      'Tehri', 'Pauri', 'Chamoli (Gopeshwar)', 'Uttarkashi', 'Bageshwar',
      'Champawat', 'Pantnagar', 'Srinagar (UK)'
    ],
  },
  {
    id: 'WB',
    name: 'West Bengal',
    hindiName: 'पश्चिम बंगाल',
    type: 'State',
    region: 'East',
    capital: 'Kolkata',
    economicSpecialty: 'Jute, Tea (Darjeeling), Haldia Port, Steel & Eastern Retail',
    demandBonusLabel: '+15% Eastern Commercial Hub',
    cities: [
      'Kolkata', 'Howrah', 'Asansol', 'Siliguri', 'Durgapur', 'Bardhaman',
      'Malda', 'Baharampur', 'Habra', 'Kharagpur', 'Shantipur', 'Dankuni',
      'Haldia', 'Raiganj', 'Krishnanagar', 'Nabadwip', 'Medinipur', 'Jalpaiguri',
      'Balurghat', 'Basirhat', 'Bankura', 'Chakdaha', 'Darjeeling',
      'Alipurduar', 'Purulia', 'Cooch Behar', 'Kalimpong', 'Bolpur'
    ],
  },

  // ======================== 8 UNION TERRITORIES ========================
  {
    id: 'AN',
    name: 'Andaman & Nicobar Islands',
    hindiName: 'अंडमान और निकोबार द्वीप समूह',
    type: 'Union Territory',
    region: 'Islands',
    capital: 'Sri Vijaya Puram (Port Blair)',
    economicSpecialty: 'Island Maritime Fisheries, Coconut & Luxury Eco-Tourism',
    demandBonusLabel: '+16% Island Supply Margin',
    cities: [
      'Sri Vijaya Puram (Port Blair)', 'Diglipur', 'Mayabunder', 'Rangat',
      'Hut Bay (Little Andaman)', 'Car Nicobar', 'Campbell Bay', 'Swaraj Dweep (Havelock)'
    ],
  },
  {
    id: 'CH',
    name: 'Chandigarh',
    hindiName: 'चंडीगढ़',
    type: 'Union Territory',
    region: 'North',
    capital: 'Chandigarh',
    economicSpecialty: 'Tri-City Commercial HQ, High-Income Retail & Tech Park',
    demandBonusLabel: '+18% Highest Per-Capita Spend',
    cities: [
      'Chandigarh', 'Manimajra', 'Sector 17 Commercial Hub', 'Chandigarh IT Park',
      'Industrial Area Phase I & II'
    ],
  },
  {
    id: 'DN',
    name: 'Dadra & Nagar Haveli and Daman & Diu',
    hindiName: 'दादरा और नगर हवेली और दमन और दीव',
    type: 'Union Territory',
    region: 'West',
    capital: 'Daman',
    economicSpecialty: 'Plastics, Packaging, Electronics & Tax-Friendly Industrial Zone',
    demandBonusLabel: '-8% Factory Overhead Zone',
    cities: [
      'Daman', 'Diu', 'Silvassa', 'Amli', 'Khanvel', 'Naroli', 'Varkund'
    ],
  },
  {
    id: 'DL',
    name: 'Delhi (NCT)',
    hindiName: 'दिल्ली (राष्ट्रीय राजधानी क्षेत्र)',
    type: 'Union Territory',
    region: 'North',
    capital: 'New Delhi',
    economicSpecialty: 'National Capital Wholesale Markets, Okhla Industry & E-Commerce HQ',
    demandBonusLabel: '+20% National Capital Mega Hub',
    cities: [
      'New Delhi', 'Old Delhi (Chandni Chowk)', 'Connaught Place', 'Okhla Industrial Area',
      'Rohini', 'Dwarka', 'Saket', 'Laxmi Nagar', 'Bawana Industrial Area',
      'Narela', 'Karol Bagh', 'Pitampura', 'Janakpuri', 'Shahdara', 'Mayapuri', 'Patparganj'
    ],
  },
  {
    id: 'JK',
    name: 'Jammu & Kashmir',
    hindiName: 'जम्मू और कश्मीर',
    type: 'Union Territory',
    region: 'North',
    capital: 'Srinagar / Jammu',
    economicSpecialty: 'Saffron, Kashmir Apples, Pashmina, Handicrafts & Winter Retail',
    demandBonusLabel: '+15% High-Value Specialty Goods',
    cities: [
      'Srinagar', 'Jammu', 'Anantnag', 'Baramulla', 'Sopore', 'Kathua',
      'Udhampur', 'Rajouri', 'Poonch', 'Pulwama', 'Kupwara', 'Budgam',
      'Samba', 'Reasi', 'Doda', 'Kishtwar', 'Ramban', 'Bandipora',
      'Ganderbal', 'Kulgam', 'Shopian', 'Katra', 'Pahalgam', 'Gulmarg'
    ],
  },
  {
    id: 'LA',
    name: 'Ladakh',
    hindiName: 'लद्दाख',
    type: 'Union Territory',
    region: 'North',
    capital: 'Leh',
    economicSpecialty: 'Solar Energy, Pashmina Wool, Apricot & High-Altitude Logistics',
    demandBonusLabel: '+16% High-Altitude Supply Premium',
    cities: [
      'Leh', 'Kargil', 'Diskit (Nubra)', 'Padum (Zanskar)', 'Nyoma',
      'Khalatse', 'Drass', 'Sankoo', 'Tangtse'
    ],
  },
  {
    id: 'LD',
    name: 'Lakshadweep',
    hindiName: 'लक्षद्वीप',
    type: 'Union Territory',
    region: 'Islands',
    capital: 'Kavaratti',
    economicSpecialty: 'Tuna Fisheries, Coir Products & Marine Coral Tourism',
    demandBonusLabel: '+15% Island Import Premium',
    cities: [
      'Kavaratti', 'Agatti', 'Amini', 'Andrott', 'Minicoy',
      'Kalpeni', 'Kadmat', 'Kiltan', 'Chetlat', 'Bitra'
    ],
  },
  {
    id: 'PY',
    name: 'Puducherry',
    hindiName: 'पुदुच्चेरी',
    type: 'Union Territory',
    region: 'South',
    capital: 'Puducherry',
    economicSpecialty: 'IT Parks, Textiles, Coastal Trade & Franco-Tamil Tourism',
    demandBonusLabel: '+13% Coastal Retail Hub',
    cities: [
      'Puducherry', 'Karaikal', 'Yanam', 'Mahe', 'Oulgaret', 'Ariyankuppam', 'Villianur'
    ],
  },
];

export const TOTAL_STATES_COUNT = INDIA_STATES_AND_UTS.filter((s) => s.type === 'State').length; // 28
export const TOTAL_UTS_COUNT = INDIA_STATES_AND_UTS.filter((s) => s.type === 'Union Territory').length; // 8
export const TOTAL_CITIES_COUNT = INDIA_STATES_AND_UTS.reduce((acc, s) => acc + s.cities.length, 0);

/**
 * Helper to find state info by state name or city name
 */
export function findStateByCityOrName(cityOrState: string): IndiaStateInfo {
  const query = cityOrState.toLowerCase();
  const matched = INDIA_STATES_AND_UTS.find(
    (s) =>
      s.name.toLowerCase() === query ||
      query.includes(s.name.toLowerCase()) ||
      s.cities.some((c) => query.includes(c.toLowerCase()))
  );
  return matched || INDIA_STATES_AND_UTS.find((s) => s.id === 'MH')!;
}
