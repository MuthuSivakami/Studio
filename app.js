/**
 * StudioFlow Pro — Multi-Service Studio Management & Event Calendar
 * Advanced JS Architecture with jQuery & Bootstrap 5
 * Features:
 *  1. Multi-Service Assignment Engine per Booking
 *  2. Specialist Staff/Crew Roster with Conflict Detection
 *  3. Interactive Click-Driven Calendar (Month / Week / Day / Crew Timeline)
 *  4. Differentiated Desktop Studio & Mobile App Touch UI
 *  5. Complete Studio CRM, Payments, Invoices, Inquiries & WhatsApp Automation
 *  (Albums concept intentionally omitted as requested)
 */

(function($) {
  'use strict';

  // =========================================================================
  // 1. DATA MODELS & STATE
  // =========================================================================
  
  // Available Studio Services Catalog
  const SERVICE_CATALOG = [
    { id: 'photo_trad', key: 'photo', name: 'Traditional Photography', price: 45000, icon: 'fa-camera', color: '#6366f1', duration: 'Full Day', desc: 'Main stage & family portraits' },
    { id: 'photo_candid', key: 'photo', name: 'Candid Photography', price: 60000, icon: 'fa-camera-rotate', color: '#8b5cf6', duration: 'Full Day', desc: 'Emotional, creative storytelling' },
    { id: 'cinema_film', key: 'cinema', name: 'Cinematic Film & 4K Teaser', price: 75000, icon: 'fa-video', color: '#f43f5e', duration: 'Full Day', desc: 'High-end wedding film with teaser' },
    { id: 'drone_aerial', key: 'drone', name: 'Drone 4K Aerial Coverage', price: 25000, icon: 'fa-helicopter', color: '#f59e0b', duration: '3-4 Hours', desc: 'Outdoor venue & baraat drone shots' },
    { id: 'makeup_hd', key: 'makeup', name: 'Bridal HD Makeup & Hair', price: 35000, icon: 'fa-wand-magic-sparkles', color: '#14b8a6', duration: '3 Hours', desc: 'Airbrush HD makeup, lashes & draping' },
    { id: 'makeup_party', key: 'makeup', name: 'Family & Party Makeup', price: 18000, icon: 'fa-gem', color: '#06b6d4', duration: '2 Hours', desc: 'Party glam for bridesmaids/family' },
    { id: 'pre_wedding', key: 'photo', name: 'Pre-Wedding Conceptual Shoot', price: 55000, icon: 'fa-heart', color: '#ec4899', duration: 'Full Day', desc: '2 locations, 3 outfit changes' },
    { id: 'same_day_edit', key: 'cinema', name: 'Same-Day Teaser Edit', price: 20000, icon: 'fa-bolt', color: '#e11d48', duration: 'On-site', desc: 'Screened at the reception night' }
  ];

  // Specialist Staff / Crew Members
  let STAFF_MEMBERS = [
    { id: 1, name: 'Aman Singh', role: 'Lead Photographer', skills: ['photo_trad', 'photo_candid', 'pre_wedding'], avatar: 'AS', color: '#6366f1', phone: '+91 98111 22334', shoots: 14, avail: true },
    { id: 2, name: 'Sara Khan', role: 'Celebrity Makeup Artist', skills: ['makeup_hd', 'makeup_party'], avatar: 'SK', color: '#14b8a6', phone: '+91 98222 33445', shoots: 10, avail: true },
    { id: 3, name: 'Rahul Dev', role: 'Senior Cinematographer', skills: ['cinema_film', 'pre_wedding', 'same_day_edit'], avatar: 'RD', color: '#f43f5e', phone: '+91 98333 44556', shoots: 16, avail: true },
    { id: 4, name: 'Vikram S.', role: 'Drone Pilot & Aerial Specialist', skills: ['drone_aerial'], avatar: 'VS', color: '#f59e0b', phone: '+91 98444 55667', shoots: 9, avail: true },
    { id: 5, name: 'Pooja M.', role: 'Senior Video Editor & Colorist', skills: ['same_day_edit', 'cinema_film'], avatar: 'PM', color: '#06b6d4', phone: '+91 98555 66778', shoots: 22, avail: true },
    { id: 6, name: 'Kunal Verma', role: 'Candid Specialist', skills: ['photo_candid', 'pre_wedding'], avatar: 'KV', color: '#8b5cf6', phone: '+91 98666 77889', shoots: 11, avail: true }
  ];

  // Multi-Service Bookings Store
  let BOOKINGS = [
    {
      id: 'BK-1024',
      customer: 'Aarav & Isha',
      phone: '+91 98765 43210',
      email: 'aarav.isha@gmail.com',
      eventType: 'Wedding',
      date: '2024-12-12',
      time: '07:00',
      venue: 'Taj Palace, Delhi',
      status: 'confirmed',
      notes: 'Grand baraat entry requires dual drone & live LED screening.',
      services: [
        { serviceId: 'photo_trad', name: 'Traditional Photography', price: 45000, staffId: 1, staffName: 'Aman Singh' },
        { serviceId: 'photo_candid', name: 'Candid Photography', price: 60000, staffId: 6, staffName: 'Kunal Verma' },
        { serviceId: 'cinema_film', name: 'Cinematic Film & 4K Teaser', price: 75000, staffId: 3, staffName: 'Rahul Dev' },
        { serviceId: 'drone_aerial', name: 'Drone 4K Aerial Coverage', price: 25000, staffId: 4, staffName: 'Vikram S.' },
        { serviceId: 'makeup_hd', name: 'Bridal HD Makeup & Hair', price: 35000, staffId: 2, staffName: 'Sara Khan' }
      ],
      totalAmount: 240000,
      advancePaid: 100000,
      balanceDue: 140000
    },
    {
      id: 'BK-1025',
      customer: 'Priya Sharma',
      phone: '+91 98123 45678',
      email: 'priya.s@gmail.com',
      eventType: 'Pre-Wedding',
      date: '2024-11-28',
      time: '06:00',
      venue: 'Lodhi Gardens & Studio Suite',
      status: 'pending',
      notes: 'Sunrise aesthetic with 3 gown changes.',
      services: [
        { serviceId: 'pre_wedding', name: 'Pre-Wedding Conceptual Shoot', price: 55000, staffId: 1, staffName: 'Aman Singh' },
        { serviceId: 'makeup_hd', name: 'Bridal HD Makeup & Hair', price: 30000, staffId: 2, staffName: 'Sara Khan' }
      ],
      totalAmount: 85000,
      advancePaid: 25000,
      balanceDue: 60000
    },
    {
      id: 'BK-1026',
      customer: 'Ananya & Kabir',
      phone: '+91 98234 56789',
      email: 'ananya.k@gmail.com',
      eventType: 'Engagement',
      date: '2024-11-30',
      time: '18:00',
      venue: 'The Leela Ambience',
      status: 'editing',
      notes: 'Cocktail ring ceremony with cinematic teaser for Instagram.',
      services: [
        { serviceId: 'photo_candid', name: 'Candid Photography', price: 50000, staffId: 6, staffName: 'Kunal Verma' },
        { serviceId: 'cinema_film', name: 'Cinematic Film & 4K Teaser', price: 55000, staffId: 3, staffName: 'Rahul Dev' },
        { serviceId: 'makeup_party', name: 'Family & Party Makeup', price: 15000, staffId: 2, staffName: 'Sara Khan' }
      ],
      totalAmount: 120000,
      advancePaid: 80000,
      balanceDue: 40000
    },
    {
      id: 'BK-1027',
      customer: 'Rohan Mehta',
      phone: '+91 98345 67890',
      email: 'rohan.m@gmail.com',
      eventType: 'Birthday',
      date: '2024-12-02',
      time: '11:00',
      venue: 'Oberoi Farm, Chattarpur',
      status: 'confirmed',
      notes: '1st Birthday milestone with photo booth setup.',
      services: [
        { serviceId: 'photo_trad', name: 'Traditional Photography', price: 25000, staffId: 1, staffName: 'Aman Singh' },
        { serviceId: 'same_day_edit', name: 'Same-Day Teaser Edit', price: 15000, staffId: 5, staffName: 'Pooja M.' }
      ],
      totalAmount: 40000,
      advancePaid: 20000,
      balanceDue: 20000
    },
    {
      id: 'BK-1028',
      customer: 'Sneha Kapoor',
      phone: '+91 98456 78901',
      email: 'sneha.k@gmail.com',
      eventType: 'Maternity',
      date: '2024-12-05',
      time: '14:30',
      venue: 'StudioFlow Indoor Stage A',
      status: 'delivered',
      notes: 'Milk bath & silk fabric studio session.',
      services: [
        { serviceId: 'photo_candid', name: 'Candid Photography', price: 30000, staffId: 6, staffName: 'Kunal Verma' },
        { serviceId: 'makeup_hd', name: 'Bridal HD Makeup & Hair', price: 15000, staffId: 2, staffName: 'Sara Khan' }
      ],
      totalAmount: 45000,
      advancePaid: 45000,
      balanceDue: 0
    },
    {
      id: 'BK-1029',
      customer: 'Vikram Singh',
      phone: '+91 98567 89012',
      email: 'vikram.s@gmail.com',
      eventType: 'Corporate',
      date: '2024-12-08',
      time: '09:00',
      venue: 'JW Marriott Aerocity',
      status: 'confirmed',
      notes: 'Tech leadership keynote and attendee photo booths.',
      services: [
        { serviceId: 'photo_trad', name: 'Traditional Photography', price: 35000, staffId: 1, staffName: 'Aman Singh' },
        { serviceId: 'drone_aerial', name: 'Drone 4K Aerial Coverage', price: 20000, staffId: 4, staffName: 'Vikram S.' },
        { serviceId: 'same_day_edit', name: 'Same-Day Teaser Edit', price: 20000, staffId: 5, staffName: 'Pooja M.' }
      ],
      totalAmount: 75000,
      advancePaid: 40000,
      balanceDue: 35000
    },
    {
      id: 'BK-1030',
      customer: 'Meera & Siddharth',
      phone: '+91 98678 90123',
      email: 'meera.sid@gmail.com',
      eventType: 'Wedding',
      date: '2024-12-18',
      time: '08:00',
      venue: 'ITC Maurya, Diplomatic Enclave',
      status: 'confirmed',
      notes: '3-day South Indian celebration with morning Muhurtham.',
      services: [
        { serviceId: 'photo_trad', name: 'Traditional Photography', price: 50000, staffId: 1, staffName: 'Aman Singh' },
        { serviceId: 'photo_candid', name: 'Candid Photography', price: 65000, staffId: 6, staffName: 'Kunal Verma' },
        { serviceId: 'cinema_film', name: 'Cinematic Film & 4K Teaser', price: 80000, staffId: 3, staffName: 'Rahul Dev' },
        { serviceId: 'makeup_hd', name: 'Bridal HD Makeup & Hair', price: 40000, staffId: 2, staffName: 'Sara Khan' }
      ],
      totalAmount: 235000,
      advancePaid: 100000,
      balanceDue: 135000
    },
    {
      id: 'BK-1031',
      customer: 'Tanya & Rishi',
      phone: '+91 98789 01234',
      email: 'tanya.r@gmail.com',
      eventType: 'Pre-Wedding',
      date: '2024-12-22',
      time: '15:00',
      venue: 'Heritage Village Resort, Manesar',
      status: 'pending',
      notes: 'Sunset vintage car shoot with drone smoke bombs.',
      services: [
        { serviceId: 'pre_wedding', name: 'Pre-Wedding Conceptual Shoot', price: 50000, staffId: 6, staffName: 'Kunal Verma' },
        { serviceId: 'drone_aerial', name: 'Drone 4K Aerial Coverage', price: 20000, staffId: 4, staffName: 'Vikram S.' }
      ],
      totalAmount: 70000,
      advancePaid: 20000,
      balanceDue: 50000
    }
  ];

  // Inquiries / Leads Pipeline Store
  let INQUIRIES = [
    { id: 1, name: 'Neha & Arjun', phone: '+91 99111 00001', source: 'Instagram DM', service: 'Royal Wedding (Photo+Cinema+Makeup)', date: '2024-12-28', budget: '₹2.2L', stage: 'new', time: '2 hours ago' },
    { id: 2, name: 'Karan Malhotra', phone: '+91 99222 00002', source: 'Google Ads', service: 'Pre-Wedding + Teaser', date: '2025-01-05', budget: '₹75k', stage: 'quote_sent', time: '1 day ago' },
    { id: 3, name: 'Simran & Raj', phone: '+91 99333 00003', source: 'WhatsApp', service: 'Wedding 2-Days Full Bundle', date: '2025-01-15', budget: '₹3.5L', stage: 'follow_up', time: 'Yesterday' },
    { id: 4, name: 'Divya Jain', phone: '+91 99444 00004', source: 'Client Referral', service: '1st Birthday Milestone', date: '2024-12-15', budget: '₹35k', stage: 'converted', time: '3 days ago' },
    { id: 5, name: 'Gaurav Khanna', phone: '+91 99555 00005', source: 'Website Form', service: 'Corporate Summit + Drone', date: '2024-12-20', budget: '₹60k', stage: 'new', time: '4 hours ago' }
  ];

  // Clients CRM Directory
  let CUSTOMERS = [
    { id: 1, name: 'Aarav & Isha', phone: '+91 98765 43210', email: 'aarav.isha@gmail.com', avatar: 'AI', color: '#6366f1', totalSpend: '₹2,40,000', eventsCount: 1, lastShoot: 'Royal Wedding (12 Dec 2024)' },
    { id: 2, name: 'Priya Sharma', phone: '+91 98123 45678', email: 'priya.s@gmail.com', avatar: 'PS', color: '#14b8a6', totalSpend: '₹85,000', eventsCount: 1, lastShoot: 'Pre-Wedding (28 Nov 2024)' },
    { id: 3, name: 'Ananya & Kabir', phone: '+91 98234 56789', email: 'ananya.k@gmail.com', avatar: 'AK', color: '#f59e0b', totalSpend: '₹1,20,000', eventsCount: 1, lastShoot: 'Engagement (30 Nov 2024)' },
    { id: 4, name: 'Rohan Mehta', phone: '+91 98345 67890', email: 'rohan.m@gmail.com', avatar: 'RM', color: '#f43f5e', totalSpend: '₹40,000', eventsCount: 1, lastShoot: 'Birthday Milestone (02 Dec 2024)' },
    { id: 5, name: 'Sneha Kapoor', phone: '+91 98456 78901', email: 'sneha.k@gmail.com', avatar: 'SK', color: '#8b5cf6', totalSpend: '₹45,000', eventsCount: 1, lastShoot: 'Maternity Session (05 Dec 2024)' },
    { id: 6, name: 'Vikram Singh', phone: '+91 98567 89012', email: 'vikram.s@gmail.com', avatar: 'VS', color: '#06b6d4', totalSpend: '₹75,000', eventsCount: 1, lastShoot: 'Corporate Summit (08 Dec 2024)' }
  ];

  // Calendar State
  let calCurrentDate = new Date(2024, 11, 12); // Dec 2024
  let calSelectedDateStr = '2024-12-12';
  let calCurrentView = 'month'; // 'month', 'week', 'day', 'timeline'
  let currentServiceFilter = 'all';

  // Temporary selected services in modal form
  let formSelectedServices = {}; // serviceId => { selected: true, price: number, staffId: number }

  // =========================================================================
  // 2. INITIALIZATION
  // =========================================================================
  $(document).ready(function() {
    initApp();
  });

  function initApp() {
    renderDashboard();
    renderCalendar();
    renderMiniCalendar();
    renderBookingsTable();
    renderInquiriesPipeline();
    renderCustomersCRM();
    renderStaffRoster();
    renderPaymentsLedger();
    renderSettingsServiceCatalog();
    initWhatsAppModule();

    // Check URL hash for direct tab navigation
    const hash = window.location.hash.replace('#', '');
    if (hash && $(`#view${capitalize(hash)}`).length) {
      switchTab(hash);
    }
  }

  // =========================================================================
  // 3. VIEWPORT & DEVICE MODE SWITCHING (Mobile vs Desktop)
  // =========================================================================
  window.setDeviceMode = function(mode) {
    const $body = $('body');
    const $btnDesktop = $('#btnViewDesktop');
    const $btnMobile = $('#btnViewMobile');
    const $btnAuto = $('#btnViewAuto');

    $('.device-switcher-pill button').removeClass('active');

    if (mode === 'desktop') {
      $body.removeClass('mobile-mode').addClass('desktop-mode');
      $btnDesktop.addClass('active');
      showToast('Desktop Mode Active', 'Full multi-column studio control suite active.', 'primary');
    } else if (mode === 'mobile') {
      $body.removeClass('desktop-mode').addClass('mobile-mode');
      $btnMobile.addClass('active');
      showToast('Mobile App View Active', 'Touch-friendly mobile app layout with bottom navigation.', 'info');
    } else {
      $body.removeClass('desktop-mode mobile-mode');
      $btnAuto.addClass('active');
      showToast('Responsive Mode Active', 'Adapts dynamically to viewport width.', 'secondary');
    }

    // Trigger calendar re-render to fit new dimensions
    renderCalendar();
  };

  window.toggleTheme = function() {
    const $body = $('body');
    const $icon = $('#themeIcon');
    if ($body.hasClass('theme-light')) {
      $body.removeClass('theme-light').addClass('theme-dark');
      $icon.removeClass('fa-moon text-primary').addClass('fa-sun text-warning');
      showToast('Theme Changed', 'Dark Luxe theme enabled', 'dark');
    } else {
      $body.removeClass('theme-dark').addClass('theme-light');
      $icon.removeClass('fa-sun text-warning').addClass('fa-moon text-primary');
      showToast('Theme Changed', 'Light Studio theme enabled', 'light');
    }
  };

  window.switchTab = function(tabName) {
    // Hide all sections
    $('.tab-pane-section').removeClass('active');
    $('.sidebar-nav .nav-link').removeClass('active');
    $('.mobile-nav-item').removeClass('active');

    const targetId = `#view${capitalize(tabName)}`;
    if ($(targetId).length) {
      $(targetId).addClass('active');
      window.location.hash = tabName;

      // Update sidebar nav active state
      $(`.sidebar-nav a[href="#${tabName}"]`).addClass('active');
      // Update mobile nav active state
      $(`.mobile-bottom-nav a[href="#${tabName}"]`).addClass('active');

      // Update mobile header title
      const titleMap = {
        dashboard: 'Studio Dashboard',
        calendar: 'Interactive Calendar',
        bookings: 'Multi-Service Bookings',
        inquiries: 'Inquiries Pipeline',
        customers: 'Client CRM',
        staff: 'Crew Duty & Roster',
        payments: 'Billing & Receipts',
        whatsapp: 'WhatsApp Dispatch',
        settings: 'Studio Settings'
      };
      $('#mobilePageTitle').text(titleMap[tabName] || 'StudioFlow');

      // If switching to calendar, re-render to ensure grid widths
      if (tabName === 'calendar') {
        renderCalendar();
      }
    }
  };

  window.openMobileMenuSheet = function() {
    const offcanvas = new bootstrap.Offcanvas(document.getElementById('mobileMoreMenuSheet'));
    offcanvas.show();
  };

  window.closeMobileMenu = function() {
    const el = document.getElementById('mobileMoreMenuSheet');
    const offcanvas = bootstrap.Offcanvas.getInstance(el);
    if (offcanvas) offcanvas.hide();
  };

  // =========================================================================
  // 4. MULTI-SERVICE ASSIGNMENT & BOOKING CREATION ENGINE
  // =========================================================================

  window.openNewBookingModal = function(presetDate, presetTime) {
    $('#bookingEditId').value = '';
    $('#bookingModalTitle').text('Create Multi-Service Booking');
    $('#bookingForm')[0].reset();
    
    const todayStr = presetDate || calSelectedDateStr || formatDateIso(new Date());
    $('#bfEventDate').val(todayStr);
    if (presetTime) {
      $('#bfEventTime').val(presetTime);
    } else {
      $('#bfEventTime').val('09:00');
    }

    // Default select 2 common services for quick start (Traditional Photo + HD Makeup)
    formSelectedServices = {
      'photo_trad': { selected: true, price: 45000, staffId: 1 },
      'makeup_hd': { selected: true, price: 35000, staffId: 2 }
    };

    renderModalServiceChecklist();
    calculateModalTotals();

    const modal = new bootstrap.Modal(document.getElementById('modalBookingForm'));
    modal.show();
  };

  window.editBooking = function(bookingId) {
    const b = BOOKINGS.find(x => x.id === bookingId);
    if (!b) return;

    $('#bookingEditId').val(b.id);
    $('#bookingModalTitle').text(`Edit Booking — ${b.id}`);
    $('#bfClientName').val(b.customer);
    $('#bfClientPhone').val(b.phone);
    $('#bfEventType').val(b.eventType);
    $('#bfEventDate').val(b.date);
    $('#bfEventTime').val(b.time);
    $('#bfVenue').val(b.venue);
    $('#bfAdvancePaid').val(b.advancePaid);
    $('#bfStatus').val(b.status);
    $('#bfNotes').val(b.notes || '');

    // Populate services map from booking
    formSelectedServices = {};
    b.services.forEach(s => {
      formSelectedServices[s.serviceId] = {
        selected: true,
        price: s.price,
        staffId: s.staffId
      };
    });

    renderModalServiceChecklist();
    calculateModalTotals();

    // Hide event detail modal if open and show edit modal
    $('#modalEventDetail').modal('hide');
    const modal = new bootstrap.Modal(document.getElementById('modalBookingForm'));
    modal.show();
  };

  function renderModalServiceChecklist() {
    const $container = $('#modalServicesContainer');
    $container.empty();

    const shootDate = $('#bfEventDate').val();
    const shootTime = $('#bfEventTime').val();

    SERVICE_CATALOG.forEach(service => {
      const isSelected = !!(formSelectedServices[service.id] && formSelectedServices[service.id].selected);
      const currentPrice = isSelected ? formSelectedServices[service.id].price : service.price;
      const currentStaffId = isSelected ? formSelectedServices[service.id].staffId : getDefaultStaffForService(service.id);

      // Find capable staff members for this service
      const capableStaff = STAFF_MEMBERS.filter(st => st.skills.includes(service.id));

      let staffOptionsHtml = `<option value="">-- Assign Crew Member --</option>`;
      capableStaff.forEach(staff => {
        // Check for potential booking conflicts on same date
        const conflict = checkStaffConflict(staff.id, shootDate, shootTime, $('#bookingEditId').val());
        const conflictTag = conflict ? ` ⚠️ (Booked on ${conflict.id})` : '';
        const isStaffSelected = currentStaffId == staff.id ? 'selected' : '';
        staffOptionsHtml += `<option value="${staff.id}" ${isStaffSelected}>${staff.name} (${staff.role})${conflictTag}</option>`;
      });

      const cardHtml = `
        <div class="service-assignment-item ${isSelected ? 'selected' : ''}" id="serviceItem_${service.id}">
          <div class="row align-items-center g-2">
            <!-- Left Checkbox & Name -->
            <div class="col-12 col-md-5 d-flex align-items-center gap-2">
              <div class="form-check m-0">
                <input class="form-check-input service-toggle-cb" type="checkbox" id="cb_${service.id}" 
                  ${isSelected ? 'checked' : ''} onchange="toggleServiceSelection('${service.id}')">
              </div>
              <label class="form-check-label d-flex align-items-center gap-2 fw-semibold cursor-pointer m-0" for="cb_${service.id}">
                <span class="badge rounded-circle p-2" style="background: ${service.color}22; color: ${service.color};">
                  <i class="fa-solid ${service.icon}"></i>
                </span>
                <div>
                  <div class="text-body">${service.name}</div>
                  <small class="text-muted smaller">${service.desc} • ${service.duration}</small>
                </div>
              </label>
            </div>

            <!-- Middle Staff Assign Dropdown -->
            <div class="col-7 col-md-4">
              <div class="input-group input-group-sm">
                <span class="input-group-text bg-surface-3 border-0 text-muted"><i class="fa-solid fa-user-check"></i></span>
                <select class="form-select form-select-sm bg-surface-3 border-0 text-body service-staff-select" 
                  id="staff_${service.id}" ${!isSelected ? 'disabled' : ''} 
                  onchange="updateServiceStaff('${service.id}', this.value)">
                  ${staffOptionsHtml}
                </select>
              </div>
            </div>

            <!-- Right Line-item Price Input -->
            <div class="col-5 col-md-3">
              <div class="input-group input-group-sm">
                <span class="input-group-text bg-surface-3 border-0">₹</span>
                <input type="number" class="form-control form-control-sm bg-surface-3 border-0 fw-bold text-primary service-price-input" 
                  id="price_${service.id}" value="${currentPrice}" ${!isSelected ? 'disabled' : ''} 
                  oninput="updateServicePrice('${service.id}', this.value)">
              </div>
            </div>
          </div>
        </div>
      `;
      $container.append(cardHtml);
    });

    updateSelectedServicesBadge();
  }

  window.toggleServiceSelection = function(serviceId) {
    const isChecked = $(`#cb_${serviceId}`).is(':checked');
    const catalogItem = SERVICE_CATALOG.find(x => x.id === serviceId);

    if (isChecked) {
      const defaultStaff = getDefaultStaffForService(serviceId);
      formSelectedServices[serviceId] = {
        selected: true,
        price: catalogItem ? catalogItem.price : 0,
        staffId: defaultStaff
      };
      $(`#serviceItem_${serviceId}`).addClass('selected');
      $(`#staff_${serviceId}`).prop('disabled', false).val(defaultStaff);
      $(`#price_${serviceId}`).prop('disabled', false).val(catalogItem.price);
    } else {
      delete formSelectedServices[serviceId];
      $(`#serviceItem_${serviceId}`).removeClass('selected');
      $(`#staff_${serviceId}`).prop('disabled', true);
      $(`#price_${serviceId}`).prop('disabled', true);
    }

    calculateModalTotals();
    updateSelectedServicesBadge();
  };

  window.updateServiceStaff = function(serviceId, staffId) {
    if (formSelectedServices[serviceId]) {
      formSelectedServices[serviceId].staffId = parseInt(staffId) || null;
    }
  };

  window.updateServicePrice = function(serviceId, priceVal) {
    if (formSelectedServices[serviceId]) {
      formSelectedServices[serviceId].price = parseFloat(priceVal) || 0;
      calculateModalTotals();
    }
  };

  function updateSelectedServicesBadge() {
    const count = Object.keys(formSelectedServices).length;
    $('#selectedServicesBadgeCount').text(`${count} Service${count === 1 ? '' : 's'} Selected`);
  }

  function getDefaultStaffForService(serviceId) {
    const member = STAFF_MEMBERS.find(st => st.skills.includes(serviceId));
    return member ? member.id : null;
  }

  function checkStaffConflict(staffId, date, time, excludeBookingId) {
    if (!staffId || !date) return null;
    return BOOKINGS.find(b => {
      if (b.id === excludeBookingId) return false;
      if (b.date !== date) return false;
      return b.services.some(s => s.staffId == staffId);
    });
  }

  function calculateModalTotals() {
    let total = 0;
    Object.keys(formSelectedServices).forEach(sid => {
      if (formSelectedServices[sid].selected) {
        total += formSelectedServices[sid].price || 0;
      }
    });

    $('#bfTotalAmount').val(total);
    const advance = parseFloat($('#bfAdvancePaid').val()) || 0;
    const balance = Math.max(0, total - advance);
    $('#bfBalanceDue').val(balance);
  }

  window.calculateBalance = function() {
    const total = parseFloat($('#bfTotalAmount').val()) || 0;
    const advance = parseFloat($('#bfAdvancePaid').val()) || 0;
    const balance = Math.max(0, total - advance);
    $('#bfBalanceDue').val(balance);
  };

  window.handleSaveBooking = function() {
    const editId = $('#bookingEditId').val();
    const customer = $('#bfClientName').val().trim();
    const phone = $('#bfClientPhone').val().trim();
    const eventType = $('#bfEventType').val();
    const date = $('#bfEventDate').val();
    const time = $('#bfEventTime').val() || '09:00';
    const venue = $('#bfVenue').val().trim();
    const advancePaid = parseFloat($('#bfAdvancePaid').val()) || 0;
    const status = $('#bfStatus').val();
    const notes = $('#bfNotes').val().trim();

    if (!customer || !phone || !date || !venue) {
      showToast('Missing Fields', 'Please complete all required client & venue fields.', 'warning');
      return;
    }

    const selectedServiceKeys = Object.keys(formSelectedServices).filter(k => formSelectedServices[k].selected);
    if (selectedServiceKeys.length === 0) {
      showToast('No Service Selected', 'Please select at least 1 service for this booking.', 'danger');
      return;
    }

    // Build itemized services array with staff names
    let totalPackage = 0;
    const servicesList = selectedServiceKeys.map(sid => {
      const cat = SERVICE_CATALOG.find(c => c.id === sid);
      const staffMember = STAFF_MEMBERS.find(st => st.id == formSelectedServices[sid].staffId);
      const price = formSelectedServices[sid].price || (cat ? cat.price : 0);
      totalPackage += price;

      return {
        serviceId: sid,
        name: cat ? cat.name : sid,
        price: price,
        staffId: staffMember ? staffMember.id : null,
        staffName: staffMember ? staffMember.name : 'Unassigned'
      };
    });

    const balanceDue = Math.max(0, totalPackage - advancePaid);

    if (editId) {
      // Update existing booking
      const idx = BOOKINGS.findIndex(b => b.id === editId);
      if (idx !== -1) {
        BOOKINGS[idx] = {
          ...BOOKINGS[idx],
          customer,
          phone,
          eventType,
          date,
          time,
          venue,
          status,
          notes,
          services: servicesList,
          totalAmount: totalPackage,
          advancePaid,
          balanceDue
        };
        showToast('Booking Updated', `Booking #${editId} updated with ${servicesList.length} services.`, 'success');
      }
    } else {
      // Create new booking ID
      const newId = `BK-${1000 + BOOKINGS.length + 1}`;
      const newBooking = {
        id: newId,
        customer,
        phone,
        email: `${customer.toLowerCase().replace(/\s+/g, '.')}@gmail.com`,
        eventType,
        date,
        time,
        venue,
        status,
        notes,
        services: servicesList,
        totalAmount: totalPackage,
        advancePaid,
        balanceDue
      };
      BOOKINGS.unshift(newBooking);

      // Trigger Confetti Celebration!
      if (typeof confetti === 'function') {
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      }
      showToast('New Booking Created!', `Shoot #${newId} scheduled for ${customer} on ${date}.`, 'success');
    }

    // Close Modal
    $('#modalBookingForm').modal('hide');

    // Refresh all views
    renderDashboard();
    renderCalendar();
    renderMiniCalendar();
    renderBookingsTable();
    renderPaymentsLedger();
  };

  window.deleteBooking = function(bookingId) {
    if (!confirm(`Are you sure you want to delete Booking #${bookingId}?`)) return;
    BOOKINGS = BOOKINGS.filter(b => b.id !== bookingId);
    $('#modalEventDetail').modal('hide');
    showToast('Booking Deleted', `Booking #${bookingId} removed from records.`, 'danger');
    renderDashboard();
    renderCalendar();
    renderMiniCalendar();
    renderBookingsTable();
    renderPaymentsLedger();
  };

  // =========================================================================
  // 5. INTERACTIVE CLICK-DRIVEN CALENDAR ENGINE
  // =========================================================================

  window.setCalendarView = function(viewName) {
    calCurrentView = viewName;
    $('#calViewMonthBtn, #calViewWeekBtn, #calViewDayBtn, #calViewTimelineBtn').removeClass('active');
    
    if (viewName === 'month') $('#calViewMonthBtn').addClass('active');
    if (viewName === 'week') $('#calViewWeekBtn').addClass('active');
    if (viewName === 'day') $('#calViewDayBtn').addClass('active');
    if (viewName === 'timeline') $('#calViewTimelineBtn').addClass('active');

    $('#calMonthView, #calWeekView, #calDayView, #calTimelineView').addClass('d-none');
    
    if (viewName === 'month') $('#calMonthView').removeClass('d-none');
    if (viewName === 'week') $('#calWeekView').removeClass('d-none');
    if (viewName === 'day') $('#calDayView').removeClass('d-none');
    if (viewName === 'timeline') $('#calTimelineView').removeClass('d-none');

    renderCalendar();
  };

  window.navCalendar = function(direction) {
    if (direction === 'prev') {
      if (calCurrentView === 'month') calCurrentDate.setMonth(calCurrentDate.getMonth() - 1);
      if (calCurrentView === 'week') calCurrentDate.setDate(calCurrentDate.getDate() - 7);
      if (calCurrentView === 'day') calCurrentDate.setDate(calCurrentDate.getDate() - 1);
      if (calCurrentView === 'timeline') calCurrentDate.setDate(calCurrentDate.getDate() - 7);
    } else if (direction === 'next') {
      if (calCurrentView === 'month') calCurrentDate.setMonth(calCurrentDate.getMonth() + 1);
      if (calCurrentView === 'week') calCurrentDate.setDate(calCurrentDate.getDate() + 7);
      if (calCurrentView === 'day') calCurrentDate.setDate(calCurrentDate.getDate() + 1);
      if (calCurrentView === 'timeline') calCurrentDate.setDate(calCurrentDate.getDate() + 7);
    } else if (direction === 'today') {
      calCurrentDate = new Date(2024, 11, 12); // Sample current month
    }
    renderCalendar();
  };

  window.filterCalendarEvents = function() {
    currentServiceFilter = $('#calServiceFilter').val();
    renderCalendar();
  };

  function renderCalendar() {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const curYear = calCurrentDate.getFullYear();
    const curMonth = calCurrentDate.getMonth();
    
    $('#calendarMainHeading').text(`${monthNames[curMonth]} ${curYear}`);

    if (calCurrentView === 'month') {
      renderMonthViewGrid(curYear, curMonth);
    } else if (calCurrentView === 'week') {
      renderWeekViewGrid();
    } else if (calCurrentView === 'day') {
      renderDayScheduleView();
    } else if (calCurrentView === 'timeline') {
      renderCrewTimelineView();
    }
  }

  function renderMonthViewGrid(year, month) {
    const $grid = $('#calMonthGrid');
    $grid.empty();

    const firstDayIndex = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const totalCells = Math.ceil((firstDayIndex + daysInMonth) / 7) * 7;
    const todayStr = '2024-12-12';

    for (let i = 0; i < totalCells; i++) {
      let dayNum;
      let cellDateStr;
      let isOtherMonth = false;

      if (i < firstDayIndex) {
        dayNum = daysInPrevMonth - firstDayIndex + i + 1;
        const prevMonth = month === 0 ? 11 : month - 1;
        const prevYear = month === 0 ? year - 1 : year;
        cellDateStr = `${prevYear}-${String(prevMonth + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
        isOtherMonth = true;
      } else if (i >= firstDayIndex + daysInMonth) {
        dayNum = i - (firstDayIndex + daysInMonth) + 1;
        const nextMonth = month === 11 ? 0 : month + 1;
        const nextYear = month === 11 ? year + 1 : year;
        cellDateStr = `${nextYear}-${String(nextMonth + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
        isOtherMonth = true;
      } else {
        dayNum = i - firstDayIndex + 1;
        cellDateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
      }

      // Filter events for this cell
      let dayBookings = BOOKINGS.filter(b => b.date === cellDateStr);
      if (currentServiceFilter !== 'all') {
        dayBookings = dayBookings.filter(b => b.services.some(s => {
          const cat = SERVICE_CATALOG.find(c => c.id === s.serviceId);
          return cat && cat.key === currentServiceFilter;
        }));
      }

      const isToday = cellDateStr === todayStr;
      const isSelected = cellDateStr === calSelectedDateStr;

      let eventsHtml = '';
      dayBookings.forEach(b => {
        const typeColor = b.eventType === 'Wedding' ? '#6366f1' : 
                          b.eventType === 'Pre-Wedding' ? '#f43f5e' :
                          b.eventType === 'Maternity' ? '#8b5cf6' : '#f59e0b';
        eventsHtml += `
          <div class="cal-event-chip text-white shadow-sm" style="background: ${typeColor};" onclick="event.stopPropagation(); showEventDetailModal('${b.id}')">
            <i class="fa-solid fa-camera smaller"></i>
            <span>${b.customer.split(' ')[0]} • ${b.services.length} Serv</span>
          </div>
        `;
      });

      const cellHtml = `
        <div class="cal-cell ${isOtherMonth ? 'other-month' : ''} ${isToday ? 'is-today' : ''} ${isSelected ? 'is-selected' : ''}" 
          data-date="${cellDateStr}" onclick="onCalendarDateClick('${cellDateStr}')">
          <div class="cal-cell-header">
            <span class="cal-cell-daynum">${dayNum}</span>
            ${dayBookings.length > 0 ? `<span class="badge bg-secondary smaller">${dayBookings.length} shoot${dayBookings.length > 1 ? 's' : ''}</span>` : ''}
          </div>
          <div class="cal-events-stack">
            ${eventsHtml}
          </div>
        </div>
      `;
      $grid.append(cellHtml);
    }
  }

  window.onCalendarDateClick = function(dateStr) {
    calSelectedDateStr = dateStr;
    $('.cal-cell').removeClass('is-selected');
    $(`.cal-cell[data-date="${dateStr}"]`).addClass('is-selected');

    // Update Mini date inspector
    updateMiniDateInspector(dateStr);

    // Open Day Inspector Modal
    showDayInspectorModal(dateStr);
  };

  function showDayInspectorModal(dateStr) {
    const dayBookings = BOOKINGS.filter(b => b.date === dateStr);
    const d = new Date(dateStr + 'T00:00:00');
    const formatted = d.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' });

    $('#dayInspectorTitle').text(`Schedule for ${formatted}`);
    $('#dayInspectorSubtitle').text(`${dayBookings.length} Multi-Service Shoot${dayBookings.length === 1 ? '' : 's'} Assigned`);

    let bodyHtml = '';
    if (dayBookings.length === 0) {
      bodyHtml = `
        <div class="text-center py-4">
          <div class="modal-icon-badge bg-surface-2 text-muted mx-auto mb-3">
            <i class="fa-regular fa-calendar-xmark fa-lg"></i>
          </div>
          <h6 class="fw-bold">No Shoots Booked on This Date</h6>
          <p class="text-muted small">All studio stages and specialist crew are completely free.</p>
          <button class="btn btn-primary btn-sm" onclick="$('#modalDayInspector').modal('hide'); openNewBookingModal('${dateStr}')">
            <i class="fa-solid fa-plus me-1"></i> Schedule Shoot on ${dateStr}
          </button>
        </div>
      `;
    } else {
      bodyHtml = `<div class="d-flex flex-column gap-3">`;
      dayBookings.forEach(b => {
        let servicesPills = b.services.map(s => `
          <span class="service-pill-chip smaller">
            ${s.name} <strong class="text-primary">(${s.staffName})</strong>
          </span>
        `).join('');

        bodyHtml += `
          <div class="card bg-surface-2 border p-3 rounded-3 shadow-sm">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div>
                <span class="badge bg-primary-subtle text-primary mb-1">${b.id} • ${b.eventType}</span>
                <h6 class="fw-bold mb-0">${b.customer}</h6>
                <small class="text-muted"><i class="fa-solid fa-location-dot me-1 text-danger"></i>${b.venue}</small>
              </div>
              <div class="text-end">
                <span class="fw-bold text-primary">₹${b.totalAmount.toLocaleString('en-IN')}</span>
                <div class="smaller text-muted">Call: ${b.time}</div>
              </div>
            </div>
            <div class="d-flex flex-wrap gap-1 mb-2">
              ${servicesPills}
            </div>
            <div class="d-flex justify-content-between align-items-center pt-2 border-top">
              <button class="btn btn-xs btn-outline-custom" onclick="$('#modalDayInspector').modal('hide'); showEventDetailModal('${b.id}')">
                <i class="fa-solid fa-eye me-1"></i> Full Call Sheet
              </button>
              <button class="btn btn-xs btn-success" onclick="quickSendWhatsApp('${b.id}')">
                <i class="fa-brands fa-whatsapp me-1"></i> WhatsApp Crew
              </button>
            </div>
          </div>
        `;
      });
      bodyHtml += `</div>`;
    }

    $('#dayInspectorBody').html(bodyHtml);
    const modal = new bootstrap.Modal(document.getElementById('modalDayInspector'));
    modal.show();
  }

  window.bookOnInspectedDate = function() {
    $('#modalDayInspector').modal('hide');
    openNewBookingModal(calSelectedDateStr);
  };

  // Week View Grid
  function renderWeekViewGrid() {
    const $container = $('#calWeekTable');
    $container.empty();

    const startOfWeek = new Date(calCurrentDate);
    const day = startOfWeek.getDay();
    startOfWeek.setDate(startOfWeek.getDate() - day); // Sunday

    const hours = ['07:00 AM', '09:00 AM', '11:00 AM', '01:00 PM', '03:00 PM', '05:00 PM', '07:00 PM', '09:00 PM'];
    
    // Header row
    let headerHtml = `<div class="time-slot-label bg-surface-2 fw-bold">Time</div>`;
    for (let d = 0; d < 7; d++) {
      const cur = new Date(startOfWeek);
      cur.setDate(cur.getDate() + d);
      const dStr = formatDateIso(cur);
      const isToday = dStr === '2024-12-12';
      headerHtml += `
        <div class="p-2 text-center border-bottom border-end bg-surface-2 ${isToday ? 'fw-bold text-primary' : ''}">
          <div class="smaller text-muted font-mono">${cur.toLocaleDateString('en-US', { weekday: 'short' })}</div>
          <div class="fw-bold">${cur.getDate()}</div>
        </div>
      `;
    }
    $container.append(headerHtml);

    // Hourly grid rows
    hours.forEach(hour => {
      let rowHtml = `<div class="time-slot-label">${hour}</div>`;
      for (let d = 0; d < 7; d++) {
        const cur = new Date(startOfWeek);
        cur.setDate(cur.getDate() + d);
        const dStr = formatDateIso(cur);
        
        // Find if shoot falls around this time
        const dayBookings = BOOKINGS.filter(b => b.date === dStr);
        let cellContent = '';
        dayBookings.forEach(b => {
          cellContent += `
            <div class="cal-event-chip bg-primary text-white mb-1" onclick="event.stopPropagation(); showEventDetailModal('${b.id}')">
              ${b.customer.split(' ')[0]} (${b.services.length} Serv)
            </div>
          `;
        });

        rowHtml += `
          <div class="time-slot-cell" onclick="openNewBookingModal('${dStr}', '${hour.slice(0, 5)}')">
            ${cellContent}
          </div>
        `;
      }
      $container.append(rowHtml);
    });
  }

  // Day Schedule View
  function renderDayScheduleView() {
    const $container = $('#calDaySchedule');
    $container.empty();

    const dStr = calSelectedDateStr;
    const dayBookings = BOOKINGS.filter(b => b.date === dStr);

    let html = `
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h5 class="fw-bold mb-0">Detailed Timeline for ${dStr}</h5>
        <button class="btn btn-sm btn-primary" onclick="openNewBookingModal('${dStr}')">
          <i class="fa-solid fa-plus me-1"></i> Add Shoot on this Day
        </button>
      </div>
    `;

    if (dayBookings.length === 0) {
      html += `
        <div class="p-5 text-center bg-surface-2 rounded-3 border">
          <i class="fa-solid fa-calendar-check fa-2x text-muted mb-2"></i>
          <p class="text-muted mb-0">No shoots assigned for this date. Click "+ Add Shoot" to schedule.</p>
        </div>
      `;
    } else {
      dayBookings.forEach(b => {
        html += `
          <div class="card bg-surface-2 border p-3 rounded-3 mb-3 shadow-sm">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div>
                <span class="badge bg-primary text-white mb-1">${b.id} • ${b.eventType}</span>
                <h5 class="fw-bold mb-0">${b.customer}</h5>
                <div class="small text-muted"><i class="fa-solid fa-location-dot me-1 text-danger"></i>${b.venue} • Call Time: ${b.time}</div>
              </div>
              <button class="btn btn-sm btn-outline-custom" onclick="showEventDetailModal('${b.id}')">View Details</button>
            </div>
            <div class="table-responsive mt-2">
              <table class="table table-sm table-borderless text-body mb-0">
                <thead class="text-muted smaller">
                  <tr>
                    <th>Service Line</th>
                    <th>Assigned Specialist</th>
                    <th>Rate</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  ${b.services.map(s => `
                    <tr class="border-top">
                      <td><i class="fa-solid fa-check text-success me-2"></i>${s.name}</td>
                      <td><strong>${s.staffName}</strong></td>
                      <td class="text-primary font-mono">₹${s.price.toLocaleString('en-IN')}</td>
                      <td><button class="btn btn-xs btn-outline-custom" onclick="quickCallStaff('${s.staffId}')"><i class="fa-solid fa-phone me-1"></i>Call</button></td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        `;
      });
    }

    $container.html(html);
  }

  // Crew Timeline View
  function renderCrewTimelineView() {
    const $container = $('#calCrewTimeline');
    $container.empty();

    let html = `
      <div class="table-responsive">
        <table class="table table-bordered text-body align-middle">
          <thead class="bg-surface-2 text-muted smaller font-mono">
            <tr>
              <th style="min-width: 180px;">Crew Specialist</th>
              <th>Status</th>
              <th>Assigned Shoots (Dec 2024)</th>
              <th class="text-end">Action</th>
            </tr>
          </thead>
          <tbody>
    `;

    STAFF_MEMBERS.forEach(staff => {
      // Find bookings this staff is assigned to
      const assigned = BOOKINGS.filter(b => b.services.some(s => s.staffId === staff.id));
      const badges = assigned.map(b => `
        <span class="badge bg-surface-3 text-body border p-2 me-1 mb-1 cursor-pointer" onclick="showEventDetailModal('${b.id}')">
          ${b.date.slice(5)}: ${b.customer.split(' ')[0]} (${b.eventType})
        </span>
      `).join('');

      html += `
        <tr>
          <td>
            <div class="d-flex align-items-center gap-2">
              <span class="avatar-sm rounded-circle d-flex align-items-center justify-content-center fw-bold" 
                style="background: ${staff.color}; color: #fff;">${staff.avatar}</span>
              <div>
                <div class="fw-bold">${staff.name}</div>
                <small class="text-muted smaller">${staff.role}</small>
              </div>
            </div>
          </td>
          <td>
            <span class="badge bg-emerald-subtle text-emerald"><i class="fa-solid fa-circle-check me-1"></i>Available</span>
          </td>
          <td>${badges || '<span class="text-muted smaller">No active duty</span>'}</td>
          <td class="text-end">
            <button class="btn btn-xs btn-outline-custom" onclick="quickCallStaff('${staff.id}')">
              <i class="fa-solid fa-phone me-1"></i> Direct
            </button>
          </td>
        </tr>
      `;
    });

    html += `</tbody></table></div>`;
    $container.html(html);
  }

  // =========================================================================
  // 6. EVENT DETAILS & FULL CALL SHEET MODAL
  // =========================================================================

  window.showEventDetailModal = function(bookingId) {
    const b = BOOKINGS.find(x => x.id === bookingId);
    if (!b) return;

    $('#eventDetailTitle').text(`Booking #${b.id} — ${b.customer}`);
    $('#eventDetailSubtitle').text(`${b.eventType} • ${b.date} at ${b.time}`);

    let servicesTableHtml = `
      <div class="table-responsive mb-3">
        <table class="table table-hover bg-surface-2 rounded-3 text-body align-middle mb-0">
          <thead class="text-muted smaller">
            <tr>
              <th class="ps-3">Service Line Item</th>
              <th>Assigned Specialist</th>
              <th>Contact</th>
              <th class="text-end pe-3">Package Value</th>
            </tr>
          </thead>
          <tbody>
    `;

    b.services.forEach(s => {
      const staffObj = STAFF_MEMBERS.find(st => st.id === s.staffId);
      servicesTableHtml += `
        <tr>
          <td class="ps-3 fw-semibold">
            <i class="fa-solid fa-circle-check text-primary me-2"></i>${s.name}
          </td>
          <td>
            <span class="badge bg-primary-subtle text-primary p-2">
              <i class="fa-solid fa-user-check me-1"></i>${s.staffName}
            </span>
          </td>
          <td class="small font-mono text-muted">${staffObj ? staffObj.phone : '+91 98000 00000'}</td>
          <td class="text-end pe-3 fw-bold font-mono text-primary">₹${s.price.toLocaleString('en-IN')}</td>
        </tr>
      `;
    });

    servicesTableHtml += `
          </tbody>
          <tfoot class="bg-surface-3 fw-bold">
            <tr>
              <td colspan="3" class="ps-3">Total Multi-Service Package</td>
              <td class="text-end pe-3 text-primary font-mono">₹${b.totalAmount.toLocaleString('en-IN')}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    `;

    const bodyHtml = `
      <div class="row g-3 mb-3">
        <div class="col-12 col-md-6">
          <div class="p-3 rounded-3 bg-surface-2 border h-100">
            <h6 class="fw-bold small text-muted text-uppercase font-mono mb-2">Shoot Logistics</h6>
            <div class="mb-1"><strong>Venue:</strong> ${b.venue}</div>
            <div class="mb-1"><strong>Call Time:</strong> ${b.time} AM/PM</div>
            <div><strong>Status:</strong> <span class="badge bg-success text-white">${b.status.toUpperCase()}</span></div>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="p-3 rounded-3 bg-surface-2 border h-100">
            <h6 class="fw-bold small text-muted text-uppercase font-mono mb-2">Payment Summary</h6>
            <div class="d-flex justify-content-between mb-1">
              <span>Advance Paid:</span>
              <strong class="text-success font-mono">₹${b.advancePaid.toLocaleString('en-IN')}</strong>
            </div>
            <div class="d-flex justify-content-between mb-1">
              <span>Balance Due:</span>
              <strong class="text-amber font-mono">₹${b.balanceDue.toLocaleString('en-IN')}</strong>
            </div>
            <div class="progress progress-sm mt-2" style="height: 6px;">
              <div class="progress-bar bg-success" style="width: ${(b.advancePaid / b.totalAmount) * 100}%"></div>
            </div>
          </div>
        </div>
      </div>

      <h6 class="fw-bold mb-2"><i class="fa-solid fa-list-check text-primary me-2"></i>Assigned Services & Crew Lineup</h6>
      ${servicesTableHtml}

      ${b.notes ? `
        <div class="p-3 rounded-3 bg-surface-2 border">
          <strong class="small text-muted text-uppercase font-mono d-block mb-1">Crew Shoot Notes:</strong>
          <p class="mb-0 small">${b.notes}</p>
        </div>
      ` : ''}
    `;

    $('#eventDetailBody').html(bodyHtml);

    // Setup action buttons
    $('#eventDetailEditBtn').off('click').on('click', () => editBooking(b.id));
    $('#eventDetailDeleteBtn').off('click').on('click', () => deleteBooking(b.id));
    $('#eventDetailWaBtn').off('click').on('click', () => quickSendWhatsApp(b.id));

    const modal = new bootstrap.Modal(document.getElementById('modalEventDetail'));
    modal.show();
  };

  // =========================================================================
  // 7. DASHBOARD & MINI CALENDAR WIDGET
  // =========================================================================

  function renderDashboard() {
    // Calculate dashboard statistics
    let totalRev = 0;
    let pendingBal = 0;
    BOOKINGS.forEach(b => {
      totalRev += b.totalAmount;
      pendingBal += b.balanceDue;
    });

    $('#dashTotalRevenue').text(`₹${totalRev.toLocaleString('en-IN')}`);
    $('#dashActiveBookings').text(`${BOOKINGS.length} Shoots`);
    $('#dashPendingBalance').text(`₹${pendingBal.toLocaleString('en-IN')}`);
    $('#badgeBookingsCount').text(BOOKINGS.length);

    // Render upcoming shoots list
    const $list = $('#dashUpcomingShootsList');
    $list.empty();

    BOOKINGS.slice(0, 5).forEach(b => {
      let serviceBadges = b.services.map(s => `
        <span class="service-pill-chip smaller">
          ${s.name} <span class="text-primary fw-bold">(${s.staffName})</span>
        </span>
      `).join('');

      const itemHtml = `
        <div class="card bg-surface-2 border p-3 rounded-3 shadow-sm cursor-pointer" onclick="showEventDetailModal('${b.id}')">
          <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-2">
            <div class="d-flex align-items-center gap-2">
              <span class="badge bg-primary text-white font-mono">${b.id}</span>
              <h6 class="fw-bold mb-0">${b.customer}</h6>
              <span class="badge bg-secondary-subtle text-body smaller">${b.eventType}</span>
            </div>
            <div class="d-flex align-items-center gap-2">
              <span class="badge bg-surface-3 text-muted small"><i class="fa-regular fa-clock me-1"></i>${b.date} • ${b.time}</span>
              <span class="fw-bold text-primary font-mono">₹${b.totalAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>
          <div class="text-muted smaller mb-2">
            <i class="fa-solid fa-location-dot me-1 text-danger"></i>${b.venue}
          </div>
          <div class="d-flex flex-wrap gap-1 mb-2">
            ${serviceBadges}
          </div>
          <div class="d-flex justify-content-between align-items-center pt-2 border-top">
            <div class="d-flex align-items-center gap-2 smaller text-muted">
              <span>Advance: ₹${b.advancePaid.toLocaleString('en-IN')}</span>
              <span>•</span>
              <span class="text-amber">Balance: ₹${b.balanceDue.toLocaleString('en-IN')}</span>
            </div>
            <div class="d-flex gap-1" onclick="event.stopPropagation()">
              <button class="btn btn-xs btn-outline-custom" onclick="editBooking('${b.id}')" title="Edit Booking"><i class="fa-solid fa-pen"></i></button>
              <button class="btn btn-xs btn-success" onclick="quickSendWhatsApp('${b.id}')" title="WhatsApp Crew"><i class="fa-brands fa-whatsapp"></i></button>
              <button class="btn btn-xs btn-outline-custom" onclick="printInvoice('${b.id}')" title="Print Invoice"><i class="fa-solid fa-print"></i></button>
            </div>
          </div>
        </div>
      `;
      $list.append(itemHtml);
    });

    // Render Dashboard Crew Grid
    const $crewGrid = $('#dashCrewGrid');
    $crewGrid.empty();

    STAFF_MEMBERS.forEach(staff => {
      const activeShoots = BOOKINGS.filter(b => b.services.some(s => s.staffId === staff.id)).length;
      const colHtml = `
        <div class="col-6 col-md-4 col-xl-2">
          <div class="card bg-surface-2 border p-2 rounded-3 text-center h-100">
            <span class="avatar-md rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center fw-bold shadow-sm"
              style="background: ${staff.color}; color: #fff;">${staff.avatar}</span>
            <h6 class="fw-bold mb-0 small text-truncate">${staff.name}</h6>
            <small class="text-muted smaller text-truncate d-block mb-2">${staff.role}</small>
            <span class="badge bg-primary-subtle text-primary smaller">${activeShoots} Shoots Assigned</span>
          </div>
        </div>
      `;
      $crewGrid.append(colHtml);
    });
  }

  // Mini Calendar on Dashboard
  let miniMonth = 11; // Dec
  let miniYear = 2024;

  window.prevMiniMonth = function() {
    miniMonth--;
    if (miniMonth < 0) { miniMonth = 11; miniYear--; }
    renderMiniCalendar();
  };

  window.nextMiniMonth = function() {
    miniMonth++;
    if (miniMonth > 11) { miniMonth = 0; miniYear++; }
    renderMiniCalendar();
  };

  function renderMiniCalendar() {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    $('#miniCalendarTitle').text(`${monthNames[miniMonth]} ${miniYear}`);
    $('#miniCalCurrentMonth').text(`${monthNames[miniMonth]} ${miniYear}`);

    const $grid = $('#miniCalGrid');
    $grid.empty();

    const firstDay = new Date(miniYear, miniMonth, 1).getDay();
    const daysInMonth = new Date(miniYear, miniMonth + 1, 0).getDate();

    // Blank cells before month start
    for (let i = 0; i < firstDay; i++) {
      $grid.append(`<div class="mini-cell text-muted opacity-25"></div>`);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const dStr = `${miniYear}-${String(miniMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const hasEvent = BOOKINGS.some(b => b.date === dStr);
      const isSelected = dStr === calSelectedDateStr;

      const cellHtml = `
        <div class="mini-cell ${hasEvent ? 'has-event' : ''} ${isSelected ? 'selected' : ''}" 
          onclick="selectMiniCalendarDate('${dStr}')">
          ${d}
        </div>
      `;
      $grid.append(cellHtml);
    }

    updateMiniDateInspector(calSelectedDateStr);
  }

  window.selectMiniCalendarDate = function(dStr) {
    calSelectedDateStr = dStr;
    renderMiniCalendar();
  };

  function updateMiniDateInspector(dStr) {
    const d = new Date(dStr + 'T00:00:00');
    $('#inspectorDateBadge').text(`${d.getDate()} ${d.toLocaleDateString('en-US', { month: 'short' })}`);
    $('#inspectorDateFull').text(d.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' }));

    const dayBookings = BOOKINGS.filter(b => b.date === dStr);
    const $list = $('#inspectorEventsList');
    $list.empty();

    if (dayBookings.length === 0) {
      $list.html(`<div class="text-muted">No shoots on this date. Click 'Book Slot' to schedule.</div>`);
    } else {
      dayBookings.forEach(b => {
        $list.append(`
          <div class="p-2 rounded bg-surface-3 mb-1 d-flex justify-content-between align-items-center cursor-pointer" onclick="showEventDetailModal('${b.id}')">
            <div>
              <strong class="text-body">${b.customer}</strong>
              <div class="text-muted smaller">${b.eventType} • ${b.services.length} services</div>
            </div>
            <span class="badge bg-primary">${b.time}</span>
          </div>
        `);
      });
    }
  }

  window.bookOnSelectedDate = function() {
    openNewBookingModal(calSelectedDateStr);
  };

  // =========================================================================
  // 8. BOOKINGS TABLE VIEW & CRM FILTERS
  // =========================================================================

  function renderBookingsTable() {
    const $container = $('#bookingsContainer');
    $container.empty();

    BOOKINGS.forEach(b => {
      let servicePills = b.services.map(s => `
        <span class="service-pill-chip smaller">
          ${s.name} <strong class="text-primary">(${s.staffName})</strong>
        </span>
      `).join('');

      const cardHtml = `
        <div class="col-12 col-xl-6 booking-data-card" data-search="${b.customer.toLowerCase()} ${b.id.toLowerCase()} ${b.venue.toLowerCase()} ${b.eventType.toLowerCase()}" data-status="${b.status}">
          <div class="card bg-surface border p-3 rounded-3 shadow-sm h-100">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div class="d-flex align-items-center gap-2">
                <span class="badge bg-primary font-mono">${b.id}</span>
                <h5 class="fw-bold mb-0">${b.customer}</h5>
              </div>
              <span class="badge bg-${b.status === 'confirmed' ? 'success' : b.status === 'editing' ? 'info' : 'warning'} text-white text-uppercase">
                ${b.status}
              </span>
            </div>

            <div class="row g-2 small text-muted mb-3">
              <div class="col-6"><i class="fa-regular fa-calendar text-primary me-1"></i>${b.date} at ${b.time}</div>
              <div class="col-6"><i class="fa-solid fa-location-dot text-danger me-1"></i>${b.venue}</div>
              <div class="col-6"><i class="fa-solid fa-phone text-success me-1"></i>${b.phone}</div>
              <div class="col-6"><i class="fa-solid fa-layer-group text-amber me-1"></i>${b.eventType}</div>
            </div>

            <div class="mb-3">
              <small class="text-muted smaller text-uppercase fw-bold font-mono d-block mb-1">Assigned Services & Specialists:</small>
              <div class="d-flex flex-wrap gap-1">
                ${servicePills}
              </div>
            </div>

            <div class="p-2 rounded bg-surface-2 border d-flex justify-content-between align-items-center mb-3">
              <div>
                <small class="text-muted smaller d-block">Package Total</small>
                <strong class="text-primary font-mono">₹${b.totalAmount.toLocaleString('en-IN')}</strong>
              </div>
              <div>
                <small class="text-muted smaller d-block">Advance Paid</small>
                <strong class="text-success font-mono">₹${b.advancePaid.toLocaleString('en-IN')}</strong>
              </div>
              <div>
                <small class="text-muted smaller d-block">Balance Due</small>
                <strong class="text-amber font-mono">₹${b.balanceDue.toLocaleString('en-IN')}</strong>
              </div>
            </div>

            <div class="d-flex justify-content-between align-items-center pt-2 border-top mt-auto">
              <button class="btn btn-sm btn-outline-custom" onclick="showEventDetailModal('${b.id}')">
                <i class="fa-solid fa-eye me-1"></i> Full Call Sheet
              </button>
              <div class="d-flex gap-1">
                <button class="btn btn-sm btn-outline-custom" onclick="editBooking('${b.id}')" title="Edit Booking"><i class="fa-solid fa-pen"></i></button>
                <button class="btn btn-sm btn-success" onclick="quickSendWhatsApp('${b.id}')" title="WhatsApp Crew"><i class="fa-brands fa-whatsapp"></i></button>
                <button class="btn btn-sm btn-outline-custom" onclick="printInvoice('${b.id}')" title="Print Invoice"><i class="fa-solid fa-print"></i></button>
              </div>
            </div>
          </div>
        </div>
      `;
      $container.append(cardHtml);
    });

    $('#bookingsCountText').text(`Showing ${BOOKINGS.length} bookings`);
  }

  window.filterBookingsTable = function() {
    const q = $('#searchBookingsInput').val().toLowerCase();
    const status = $('#filterBookingStatus').val();

    let visibleCount = 0;
    $('.booking-data-card').each(function() {
      const searchData = $(this).attr('data-search') || '';
      const cardStatus = $(this).attr('data-status') || '';

      const matchesSearch = !q || searchData.includes(q);
      const matchesStatus = status === 'all' || cardStatus === status;

      if (matchesSearch && matchesStatus) {
        $(this).show();
        visibleCount++;
      } else {
        $(this).hide();
      }
    });

    $('#bookingsCountText').text(`Showing ${visibleCount} of ${BOOKINGS.length} bookings`);
  };

  // =========================================================================
  // 9. INQUIRIES & LEAD PIPELINE
  // =========================================================================

  function renderInquiriesPipeline() {
    const $board = $('#inquiryKanbanBoard');
    $board.empty();

    const stages = [
      { id: 'new', title: 'New Leads', color: 'primary', icon: 'fa-sparkles' },
      { id: 'quote_sent', title: 'Quote Sent', color: 'info', icon: 'fa-paper-plane' },
      { id: 'follow_up', title: 'Follow-Up', color: 'amber', icon: 'fa-phone-volume' },
      { id: 'converted', title: 'Converted', color: 'success', icon: 'fa-circle-check' }
    ];

    stages.forEach(st => {
      const leads = INQUIRIES.filter(inq => inq.stage === st.id);
      let cardsHtml = '';

      leads.forEach(l => {
        cardsHtml += `
          <div class="kanban-card">
            <div class="d-flex justify-content-between align-items-start mb-1">
              <strong class="text-body">${l.name}</strong>
              <span class="badge bg-surface-3 text-muted smaller">${l.source}</span>
            </div>
            <div class="small text-muted mb-2">${l.service}</div>
            <div class="d-flex justify-content-between align-items-center pt-2 border-top smaller">
              <span class="text-primary fw-bold font-mono">${l.budget}</span>
              <div class="d-flex gap-1">
                <button class="btn btn-xs btn-outline-custom" onclick="convertInquiryToBooking(${l.id})" title="Convert to Multi-Service Booking">
                  <i class="fa-solid fa-arrow-right-arrow-left text-success"></i> Convert
                </button>
              </div>
            </div>
          </div>
        `;
      });

      const colHtml = `
        <div class="col-12 col-md-6 col-xl-3">
          <div class="kanban-column">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <div class="d-flex align-items-center gap-2">
                <span class="badge bg-${st.color} rounded-circle p-2"></span>
                <h6 class="fw-bold mb-0">${st.title}</h6>
              </div>
              <span class="badge bg-surface-2 text-muted">${leads.length}</span>
            </div>
            <div class="kanban-cards-stack">
              ${cardsHtml || '<div class="text-center text-muted py-4 smaller">No leads in stage</div>'}
            </div>
          </div>
        </div>
      `;
      $board.append(colHtml);
    });

    $('#badgeInquiriesCount').text(`${INQUIRIES.filter(x => x.stage === 'new').length} New`);
  }

  window.convertInquiryToBooking = function(inquiryId) {
    const inq = INQUIRIES.find(x => x.id === inquiryId);
    if (!inq) return;

    openNewBookingModal();
    $('#bfClientName').val(inq.name);
    $('#bfClientPhone').val(inq.phone);
    $('#bfEventDate').val(inq.date || '2024-12-28');
    showToast('Inquiry Ready to Convert', `Prefilled ${inq.name}. Assign multi-services and save.`, 'info');
  };

  // =========================================================================
  // 10. CLIENTS CRM & STAFF ROSTER
  // =========================================================================

  function renderCustomersCRM() {
    const $grid = $('#customersGrid');
    $grid.empty();

    CUSTOMERS.forEach(c => {
      const cardHtml = `
        <div class="col-12 col-md-6 col-xl-4">
          <div class="card bg-surface border p-3 rounded-3 shadow-sm h-100">
            <div class="d-flex align-items-center gap-3 mb-3">
              <span class="avatar-lg rounded-circle d-flex align-items-center justify-content-center fw-bold shadow-sm"
                style="background: ${c.color}; color: #fff;">${c.avatar}</span>
              <div>
                <h5 class="fw-bold mb-0">${c.name}</h5>
                <small class="text-muted"><i class="fa-solid fa-phone me-1 text-success"></i>${c.phone}</small>
              </div>
            </div>
            <div class="p-2 rounded bg-surface-2 border mb-3 smaller">
              <div class="d-flex justify-content-between mb-1">
                <span class="text-muted">Lifetime Value:</span>
                <strong class="text-primary font-mono">${c.totalSpend}</strong>
              </div>
              <div class="d-flex justify-content-between">
                <span class="text-muted">Last Event:</span>
                <span>${c.lastShoot}</span>
              </div>
            </div>
            <div class="d-flex gap-2 mt-auto">
              <a href="tel:${c.phone}" class="btn btn-sm btn-outline-custom flex-grow-1">
                <i class="fa-solid fa-phone me-1"></i> Call Client
              </a>
              <button class="btn btn-sm btn-success flex-grow-1" onclick="directClientWhatsApp('${c.phone}', '${c.name}')">
                <i class="fa-brands fa-whatsapp me-1"></i> WhatsApp
              </button>
            </div>
          </div>
        </div>
      `;
      $grid.append(cardHtml);
    });
  }

  function renderStaffRoster() {
    const $grid = $('#staffRosterGrid');
    $grid.empty();

    STAFF_MEMBERS.forEach(st => {
      const skillsHtml = st.skills.map(sk => {
        const cat = SERVICE_CATALOG.find(c => c.id === sk);
        return `<span class="badge bg-surface-3 text-body border">${cat ? cat.name : sk}</span>`;
      }).join(' ');

      const assignedShoots = BOOKINGS.filter(b => b.services.some(s => s.staffId === st.id)).length;

      const cardHtml = `
        <div class="col-12 col-md-6 col-xl-4">
          <div class="card bg-surface border p-3 rounded-3 shadow-sm h-100">
            <div class="d-flex justify-content-between align-items-start mb-3">
              <div class="d-flex align-items-center gap-3">
                <span class="avatar-lg rounded-circle d-flex align-items-center justify-content-center fw-bold shadow-sm"
                  style="background: ${st.color}; color: #fff;">${st.avatar}</span>
                <div>
                  <h5 class="fw-bold mb-0">${st.name}</h5>
                  <span class="badge bg-primary-subtle text-primary">${st.role}</span>
                </div>
              </div>
              <span class="status-dot pulse-green" title="Available"></span>
            </div>

            <div class="mb-3">
              <small class="text-muted smaller text-uppercase fw-bold font-mono d-block mb-1">Approved Specializations:</small>
              <div class="d-flex flex-wrap gap-1">
                ${skillsHtml}
              </div>
            </div>

            <div class="p-2 rounded bg-surface-2 border mb-3 smaller d-flex justify-content-between align-items-center">
              <span>Current Shoots Assigned:</span>
              <strong class="text-primary font-mono">${assignedShoots} Events</strong>
            </div>

            <div class="d-flex gap-2 mt-auto">
              <button class="btn btn-sm btn-outline-custom flex-grow-1" onclick="quickCallStaff('${st.id}')">
                <i class="fa-solid fa-phone me-1"></i> Call Specialist
              </button>
              <button class="btn btn-sm btn-success" onclick="directCrewWhatsApp('${st.phone}', '${st.name}')">
                <i class="fa-brands fa-whatsapp"></i>
              </button>
            </div>
          </div>
        </div>
      `;
      $grid.append(cardHtml);
    });
  }

  // =========================================================================
  // 11. PAYMENTS LEDGER & PRINTABLE INVOICES
  // =========================================================================

  function renderPaymentsLedger() {
    const $tbody = $('#paymentsTableBody');
    $tbody.empty();

    BOOKINGS.forEach(b => {
      const servicesBrief = b.services.map(s => s.name.split(' ')[0]).join(', ');
      const statusBadge = b.balanceDue === 0 ? 
        `<span class="badge bg-success-subtle text-success">Paid in Full</span>` :
        `<span class="badge bg-amber-subtle text-amber">₹${b.balanceDue.toLocaleString('en-IN')} Due</span>`;

      const rowHtml = `
        <tr>
          <td class="ps-3 fw-bold font-mono text-primary">${b.id}</td>
          <td>
            <div class="fw-bold">${b.customer}</div>
            <small class="text-muted smaller">${b.eventType} • ${b.date}</small>
          </td>
          <td class="small text-muted">${servicesBrief}</td>
          <td class="fw-bold font-mono">₹${b.totalAmount.toLocaleString('en-IN')}</td>
          <td class="text-success font-mono">₹${b.advancePaid.toLocaleString('en-IN')}</td>
          <td class="text-amber font-mono">₹${b.balanceDue.toLocaleString('en-IN')}</td>
          <td>${statusBadge}</td>
          <td class="text-end pe-3">
            <button class="btn btn-xs btn-outline-custom" onclick="printInvoice('${b.id}')" title="Print Invoice">
              <i class="fa-solid fa-print me-1"></i> Invoice
            </button>
          </td>
        </tr>
      `;
      $tbody.append(rowHtml);
    });
  }

  window.printInvoice = function(bookingId) {
    const b = BOOKINGS.find(x => x.id === bookingId);
    if (!b) return;

    let rowsHtml = '';
    b.services.forEach((s, idx) => {
      rowsHtml += `
        <tr>
          <td>${idx + 1}</td>
          <td><strong>${s.name}</strong><br><small class="text-muted">Assigned Specialist: ${s.staffName}</small></td>
          <td class="text-end font-mono">₹${s.price.toLocaleString('en-IN')}</td>
        </tr>
      `;
    });

    const invoiceHtml = `
      <div class="invoice-printable p-4 bg-white text-dark rounded-3" style="font-family: var(--font-sans);">
        <div class="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
          <div>
            <h3 class="fw-bold mb-0 text-primary">StudioFlow Pro Creations</h3>
            <div class="small text-muted">Multi-Service Studio & Media Production</div>
            <div class="smaller text-muted">DLF Cyber City, Delhi NCR • +91 98765 00000 • GSTIN: 07AAACS1234F1Z5</div>
          </div>
          <div class="text-end">
            <h4 class="fw-bold mb-0">TAX INVOICE</h4>
            <div class="small text-muted font-mono">Invoice #: INV-${b.id}</div>
            <div class="small text-muted">Date: ${b.date}</div>
          </div>
        </div>

        <div class="row mb-4">
          <div class="col-6">
            <h6 class="text-uppercase text-muted smaller font-mono fw-bold">Billed To:</h6>
            <h5 class="fw-bold mb-1">${b.customer}</h5>
            <div class="small text-muted">Phone: ${b.phone}</div>
            <div class="small text-muted">Email: ${b.email}</div>
            <div class="small text-muted">Shoot Venue: ${b.venue}</div>
          </div>
          <div class="col-6 text-end">
            <h6 class="text-uppercase text-muted smaller font-mono fw-bold">Event Details:</h6>
            <div class="fw-bold">${b.eventType} Ceremony</div>
            <div class="small text-muted">Shoot Date: ${b.date} | Call Time: ${b.time}</div>
            <div class="mt-2">
              <span class="badge ${b.balanceDue === 0 ? 'bg-success' : 'bg-warning text-dark'}">${b.balanceDue === 0 ? 'PAID IN FULL' : 'PARTIALLY PAID'}</span>
            </div>
          </div>
        </div>

        <table class="table table-bordered mb-4">
          <thead class="bg-light">
            <tr>
              <th style="width: 50px;">#</th>
              <th>Service Description & Staff Assigned</th>
              <th class="text-end" style="width: 150px;">Amount (INR)</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2" class="text-end fw-bold">Subtotal:</td>
              <td class="text-end font-mono fw-bold">₹${b.totalAmount.toLocaleString('en-IN')}</td>
            </tr>
            <tr>
              <td colspan="2" class="text-end text-success fw-bold">Advance Received:</td>
              <td class="text-end font-mono text-success fw-bold">(-) ₹${b.advancePaid.toLocaleString('en-IN')}</td>
            </tr>
            <tr class="table-active">
              <td colspan="2" class="text-end fw-bold text-primary">Balance Due Upon Delivery:</td>
              <td class="text-end font-mono fw-bold text-primary">₹${b.balanceDue.toLocaleString('en-IN')}</td>
            </tr>
          </tfoot>
        </table>

        <div class="border-top pt-3 text-center text-muted smaller">
          <p class="mb-1">Thank you for choosing StudioFlow Pro. All digital media teasers and raw files are processed with calibrated color grading.</p>
          <p class="mb-0">Bank Transfer / UPI: <strong>studioflow@upi</strong> | Account: 012345678901 (IFSC: HDFC0001234)</p>
        </div>
      </div>
    `;

    $('#invoicePrintArea').html(invoiceHtml);
    const modal = new bootstrap.Modal(document.getElementById('modalInvoice'));
    modal.show();
  };

  // =========================================================================
  // 12. WHATSAPP AUTOMATION ENGINE
  // =========================================================================

  let waCurrentTemplate = 'confirm';

  function initWhatsAppModule() {
    const $select = $('#waBookingSelect');
    $select.empty();

    BOOKINGS.forEach(b => {
      $select.append(`<option value="${b.id}">${b.id} — ${b.customer} (${b.eventType} • ${b.date})</option>`);
    });

    updateWhatsAppPreview();
  }

  window.setWaTemplate = function(templateType, btn) {
    waCurrentTemplate = templateType;
    $('#waTemplateGroup button').removeClass('active');
    $(btn).addClass('active');
    updateWhatsAppPreview();
  };

  window.updateWhatsAppPreview = function() {
    const bId = $('#waBookingSelect').val();
    const b = BOOKINGS.find(x => x.id === bId) || BOOKINGS[0];
    if (!b) return;

    let msg = '';
    const servicesList = b.services.map(s => `• *${s.name}* (Specialist: ${s.staffName})`).join('\n');

    if (waCurrentTemplate === 'confirm') {
      msg = `📸 *STUDIOFLOW PRO — BOOKING CONFIRMATION* 🎬\n\nDear *${b.customer}*,\n\nWe are delighted to confirm your multi-service booking with StudioFlow Pro!\n\n📋 *Event Details:*\n• *Booking ID:* #${b.id}\n• *Event:* ${b.eventType}\n• *Date:* ${b.date}\n• *Call Time:* ${b.time}\n• *Venue:* ${b.venue}\n\n✨ *Assigned Services & Specialist Crew:*\n${servicesList}\n\n💳 *Financial Summary:*\n• *Total Package:* ₹${b.totalAmount.toLocaleString('en-IN')}\n• *Advance Paid:* ₹${b.advancePaid.toLocaleString('en-IN')}\n• *Balance Due:* ₹${b.balanceDue.toLocaleString('en-IN')}\n\nOur crew will arrive 30 minutes prior to call time for lighting and gear prep.\n\nWarm regards,\n*StudioFlow Operations Team*`;
    } else if (waCurrentTemplate === 'crew_call') {
      msg = `🚨 *STUDIOFLOW CREW CALL SHEET* 🚨\n\nAttention Crew Members,\n\nHere is your official duty assignment for *${b.date}*:\n\n📍 *Shoot:* ${b.customer} — ${b.eventType}\n🏢 *Venue:* ${b.venue}\n⏰ *Call Time:* ${b.time} AM/PM\n\n👥 *Assigned Specialist Crew:*\n${servicesList}\n\n📝 *Shoot Notes:* ${b.notes || 'Full battery charge, 4K cards & audio sync required.'}\n\nPlease confirm availability by replying to this broadcast.`;
    } else if (waCurrentTemplate === 'reminder') {
      msg = `⏰ *SHOOT REMINDER — STUDIOFLOW PRO* 📸\n\nHi *${b.customer}*,\n\nThis is a quick 24-hour reminder for your upcoming *${b.eventType}* shoot tomorrow!\n\n📅 *Date:* ${b.date}\n⏰ *Arrival Time:* ${b.time}\n📍 *Location:* ${b.venue}\n\nIf you need any adjustments or location pin updates, please ping us directly.\nSee you tomorrow! 🌟`;
    } else if (waCurrentTemplate === 'payment') {
      msg = `💳 *STUDIOFLOW PRO — PAYMENT BALANCE INVOICE* 🧾\n\nDear *${b.customer}*,\n\nThank you for choosing us for your *${b.eventType}*.\n\nHere is your pending balance statement:\n• *Total Package:* ₹${b.totalAmount.toLocaleString('en-IN')}\n• *Advance Received:* ₹${b.advancePaid.toLocaleString('en-IN')}\n• *Balance Due:* *₹${b.balanceDue.toLocaleString('en-IN')}*\n\n📲 *UPI ID:* studioflow@upi\n🏦 *Bank A/C:* 012345678901 (IFSC: HDFC0001234)\n\nPlease share transaction screenshot upon transfer. Thank you!`;
    }

    $('#waMessageContent').text(msg);
  };

  window.sendWhatsAppDirect = function() {
    const bId = $('#waBookingSelect').val();
    const b = BOOKINGS.find(x => x.id === bId);
    const msg = $('#waMessageContent').text();
    const phone = b ? b.phone.replace(/[^0-9]/g, '') : '';
    const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  window.copyWhatsAppMessage = function() {
    const msg = $('#waMessageContent').text();
    navigator.clipboard.writeText(msg).then(() => {
      showToast('Copied to Clipboard', 'WhatsApp message ready to paste.', 'teal');
    });
  };

  window.quickSendWhatsApp = function(bookingId) {
    switchTab('whatsapp');
    $('#waBookingSelect').val(bookingId);
    updateWhatsAppPreview();
  };

  window.quickCallStaff = function(staffId) {
    const st = STAFF_MEMBERS.find(x => x.id == staffId);
    if (st) {
      window.location.href = `tel:${st.phone}`;
    }
  };

  window.directClientWhatsApp = function(phone, name) {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const msg = `Hello ${name}, greetings from StudioFlow Pro!`;
    window.open(`https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(msg)}`, '_blank');
  };

  window.directCrewWhatsApp = function(phone, name) {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const msg = `Hi ${name}, checking in regarding your StudioFlow crew schedule.`;
    window.open(`https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(msg)}`, '_blank');
  };

  // =========================================================================
  // 13. SETTINGS & UTILITIES
  // =========================================================================

  function renderSettingsServiceCatalog() {
    const $list = $('#settingsServiceList');
    $list.empty();

    SERVICE_CATALOG.forEach(s => {
      $list.append(`
        <div class="list-group-item bg-surface-2 border rounded-2 d-flex justify-content-between align-items-center">
          <div>
            <strong class="text-body">${s.name}</strong>
            <div class="text-muted smaller">${s.desc} • ${s.duration}</div>
          </div>
          <span class="fw-bold font-mono text-primary">₹${s.price.toLocaleString('en-IN')}</span>
        </div>
      `);
    });
  }

  window.saveStudioSettings = function() {
    showToast('Settings Saved', 'Studio configuration and rates updated successfully.', 'success');
  };

  window.resetSampleData = function() {
    localStorage.clear();
    location.reload();
  };

  window.showCalendarHelp = function() {
    alert('StudioFlow Calendar Features:\n\n1. Click any Date: Opens day schedule drawer & booking prompt.\n2. Click Time Slot (Week/Day view): Pre-fills date and call time.\n3. Multi-Service Filter: Toggle Photo, Cinema, Makeup, Drone.\n4. Click Event Chip: Inspect full crew call sheet and WhatsApp dispatch.');
  };

  // Helper Toast Notification
  window.showToast = function(title, message, variant = 'primary') {
    const id = 'toast_' + Date.now();
    const bgClass = variant === 'success' ? 'bg-success' : 
                    variant === 'danger' ? 'bg-danger' : 
                    variant === 'warning' ? 'bg-warning text-dark' : 
                    variant === 'info' ? 'bg-info text-dark' : 'bg-primary';

    const toastHtml = `
      <div id="${id}" class="toast align-items-center text-white ${bgClass} border-0 shadow-lg mb-2" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
          <div class="toast-body">
            <strong>${title}</strong><br>
            <small>${message}</small>
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>
    `;

    $('#toastContainer').append(toastHtml);
    const toastEl = document.getElementById(id);
    const toast = new bootstrap.Toast(toastEl, { delay: 3500 });
    toast.show();
    toastEl.addEventListener('hidden.bs.toast', () => $(toastEl).remove());
  };

  function formatDateIso(dateObj) {
    const y = dateObj.getFullYear();
    const m = String(dateObj.getMonth() + 1).padStart(2, '0');
    const d = String(dateObj.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

})(jQuery);
