import {
    CalendarMonth,
    CheckCircle,
    CloudUpload,
    Download,
    PriorityHigh,
    Save
} from '@mui/icons-material';
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';

const AttendanceTracker = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [students, setStudents] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [exportOptions, setExportOptions] = useState({
    startDate: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    format: 'csv'
  });

  // Define loadAttendanceData function first using useCallback
  const loadAttendanceData = React.useCallback((courseId, date) => {
    // Reset editing mode
    setIsEditing(false);
    
    // Mock attendance data - In a real app, this would be an API call
    // This is a simplified example where we generate random attendance
    const mockAttendanceData = {};
    
    // Use students from state to generate random attendance
    students.forEach(student => {
      // Generate random attendance status for demo
      const randomStatus = Math.random() > 0.2 ? 'present' : (Math.random() > 0.5 ? 'absent' : 'late');
      mockAttendanceData[student.id] = randomStatus;
    });
    
    setAttendanceRecords(mockAttendanceData);
  }, [students]);

  useEffect(() => {
    // Mock data - in a real app, these would be API calls
    const mockCourses = [
      {
        id: '101',
        code: 'CS101',
        name: 'Introduction to Computer Science',
        schedule: 'Monday/Wednesday 9:00 AM - 10:30 AM',
        location: 'Room 101',
        enrolled: 18,
      },
      {
        id: '102',
        code: 'CS201',
        name: 'Data Structures and Algorithms',
        schedule: 'Tuesday/Thursday 2:00 PM - 3:30 PM',
        location: 'Room 205',
        enrolled: 15,
      },
    ];
    
    setCourses(mockCourses);
  }, []);

  // Load students when course changes
  useEffect(() => {
    if (selectedCourse) {
      loadStudents(selectedCourse.id);
    }
  }, [selectedCourse]);

  // Load attendance data when course or date changes
  useEffect(() => {
    if (selectedCourse && selectedDate) {
      loadAttendanceData(selectedCourse.id, selectedDate);
    }
  }, [selectedCourse, selectedDate, loadAttendanceData]);

  const loadStudents = (courseId) => {
    // Mock students data
    const mockStudents = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        studentId: 'ST10001',
        courseId: '101',
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        studentId: 'ST10002',
        courseId: '101',
      },
      {
        id: '3',
        name: 'Bob Johnson',
        email: 'bob.johnson@example.com',
        studentId: 'ST10003',
        courseId: '101',
      },
      {
        id: '4',
        name: 'Alice Brown',
        email: 'alice.brown@example.com',
        studentId: 'ST10004',
        courseId: '102',
      },
      {
        id: '5',
        name: 'Charlie Wilson',
        email: 'charlie.wilson@example.com',
        studentId: 'ST10005',
        courseId: '102',
      },
    ];
    
    setStudents(mockStudents.filter(s => s.courseId === courseId));
  };

  const handleCourseChange = (event) => {
    const courseId = event.target.value;
    setSelectedCourse(courses.find(course => course.id === courseId));
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleAttendanceChange = (studentId, status) => {
    setAttendanceRecords({
      ...attendanceRecords,
      [studentId]: status
    });
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const saveAttendance = () => {
    // In a real app, this would be an API call to save the attendance
    console.log('Saving attendance for:', selectedDate);
    console.log('Attendance data:', attendanceRecords);
    
    setSnackbar({
      open: true,
      message: 'Attendance saved successfully!',
      severity: 'success'
    });
    
    setIsEditing(false);
  };

  const markAllPresent = () => {
    const updatedRecords = {};
    students.forEach(student => {
      updatedRecords[student.id] = 'present';
    });
    setAttendanceRecords(updatedRecords);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const openExportDialog = () => {
    setExportDialogOpen(true);
  };

  const closeExportDialog = () => {
    setExportDialogOpen(false);
  };

  const handleExportOptionChange = (field, value) => {
    setExportOptions({
      ...exportOptions,
      [field]: value
    });
  };

  const exportAttendance = () => {
    // In a real app, this would trigger a download of attendance data
    console.log('Exporting attendance data:', exportOptions);
    
    // Simulate success
    setSnackbar({
      open: true,
      message: 'Attendance data exported successfully!',
      severity: 'success'
    });
    
    closeExportDialog();
  };

  // Helper function to display attendance status with appropriate color
  const getStatusChip = (status, studentId) => {
    if (isEditing) {
      return (
        <Select
          value={status || 'absent'}
          onChange={(e) => handleAttendanceChange(studentId, e.target.value)}
          size="small"
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="present">Present</MenuItem>
          <MenuItem value="absent">Absent</MenuItem>
          <MenuItem value="late">Late</MenuItem>
        </Select>
      );
    }
    
    let color = 'default';
    let icon = null;
    
    switch (status) {
      case 'present':
        color = 'success';
        icon = <CheckCircle fontSize="small" />;
        break;
      case 'absent':
        color = 'error';
        icon = <PriorityHigh fontSize="small" />;
        break;
      case 'late':
        color = 'warning';
        icon = <PriorityHigh fontSize="small" />;
        break;
      default:
        color = 'default';
    }
    
    return (
      <Chip 
        label={status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Unknown'} 
        color={color} 
        size="small" 
        icon={icon}
      />
    );
  };

  // Calculate attendance statistics
  const getAttendanceStats = () => {
    if (!attendanceRecords || Object.keys(attendanceRecords).length === 0) {
      return { present: 0, absent: 0, late: 0, presentPercentage: 0 };
    }
    
    const stats = Object.values(attendanceRecords).reduce((acc, status) => {
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, { present: 0, absent: 0, late: 0 });
    
    const total = Object.values(stats).reduce((sum, count) => sum + count, 0);
    stats.presentPercentage = total > 0 ? Math.round((stats.present / total) * 100) : 0;
    
    return stats;
  };

  const stats = getAttendanceStats();

  // Helper function to format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Attendance Tracker
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        Record and manage student attendance for your courses.
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {/* Controls */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel id="course-select-label">Course</InputLabel>
                  <Select
                    labelId="course-select-label"
                    id="course-select"
                    value={selectedCourse?.id || ''}
                    label="Course"
                    onChange={handleCourseChange}
                  >
                    {courses.map((course) => (
                      <MenuItem key={course.id} value={course.id}>
                        {course.code} - {course.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Select Date"
                  type="date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {isEditing ? (
                    <>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Save />}
                        onClick={saveAttendance}
                      >
                        Save
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={markAllPresent}
                      >
                        Mark All Present
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="contained"
                        onClick={toggleEditMode}
                        disabled={!selectedCourse}
                      >
                        Edit Attendance
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<Download />}
                        onClick={openExportDialog}
                        disabled={!selectedCourse}
                      >
                        Export
                      </Button>
                    </>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {selectedCourse && (
          <>
            {/* Attendance Stats */}
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>Present</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h3" color="success.main" sx={{ mr: 1 }}>
                          {stats.present}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          students
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        {stats.presentPercentage}% of class
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>Absent</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h3" color="error.main" sx={{ mr: 1 }}>
                          {stats.absent}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          students
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        {stats.absent > 0 ? Math.round((stats.absent / Object.keys(attendanceRecords).length) * 100) : 0}% of class
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>Late</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h3" color="warning.main" sx={{ mr: 1 }}>
                          {stats.late}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          students
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        {stats.late > 0 ? Math.round((stats.late / Object.keys(attendanceRecords).length) * 100) : 0}% of class
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>

            {/* Attendance Table */}
            <Grid item xs={12}>
              <Paper>
                <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                  <CalendarMonth color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6">
                    Attendance for {selectedCourse.name} - {formatDate(selectedDate)}
                  </Typography>
                </Box>
                <Divider />
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Student ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {students.length > 0 ? (
                        students.map((student) => (
                          <TableRow key={student.id}>
                            <TableCell>{student.studentId}</TableCell>
                            <TableCell>{student.name}</TableCell>
                            <TableCell>
                              {getStatusChip(attendanceRecords[student.id], student.id)}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={3} align="center">
                            <Typography color="textSecondary">
                              No students found for this course.
                            </Typography>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
          </>
        )}
      </Grid>

      {/* Export Dialog */}
      <Dialog open={exportDialogOpen} onClose={closeExportDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Export Attendance Data</DialogTitle>
        <DialogContent>
          <Box sx={{ p: 1 }}>
            <Typography variant="subtitle1" gutterBottom>
              Select the date range and format for the export
            </Typography>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Start Date"
                  type="date"
                  value={exportOptions.startDate}
                  onChange={(e) => handleExportOptionChange('startDate', e.target.value)}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="End Date"
                  type="date"
                  value={exportOptions.endDate}
                  onChange={(e) => handleExportOptionChange('endDate', e.target.value)}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="export-format-label">Export Format</InputLabel>
                  <Select
                    labelId="export-format-label"
                    value={exportOptions.format}
                    label="Export Format"
                    onChange={(e) => handleExportOptionChange('format', e.target.value)}
                  >
                    <MenuItem value="csv">CSV</MenuItem>
                    <MenuItem value="pdf">PDF</MenuItem>
                    <MenuItem value="excel">Excel</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeExportDialog}>Cancel</Button>
          <Button 
            variant="contained" 
            startIcon={<CloudUpload />}
            onClick={exportAttendance}
          >
            Export
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AttendanceTracker; 