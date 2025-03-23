import {
    Add,
    Class,
    Delete,
    Edit,
    Person
} from '@mui/icons-material';
import {
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
    Grid,
    IconButton,
    Paper,
    Tab,
    Tabs,
    TextField,
    Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

// TabPanel component
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`course-tabpanel-${index}`}
      aria-labelledby={`course-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const LecturerCourseManager = () => {
  const [tabValue, setTabValue] = useState(0);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [students, setStudents] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [formData, setFormData] = useState({});

  useEffect(() => {
    // Mock API call to get courses
    const fetchCourses = async () => {
      // Simulate API delay
      setTimeout(() => {
        const mockCourses = [
          {
            id: '101',
            code: 'CS101',
            name: 'Introduction to Computer Science',
            schedule: 'Monday/Wednesday 9:00 AM - 10:30 AM',
            location: 'Room 101',
            enrolled: 18,
            description: 'Introductory course covering basic concepts of computer science.',
          },
          {
            id: '102',
            code: 'CS201',
            name: 'Data Structures and Algorithms',
            schedule: 'Tuesday/Thursday 2:00 PM - 3:30 PM',
            location: 'Room 205',
            enrolled: 15,
            description: 'Advanced course covering data structures and algorithm analysis.',
          },
        ];
        setCourses(mockCourses);
        // Set the first course as selected by default
        if (mockCourses.length > 0 && !selectedCourse) {
          setSelectedCourse(mockCourses[0]);
        }
      }, 500);
    };
    
    fetchCourses();
  }, []); // Initial load

  // New useEffect to handle loading course-specific data when selectedCourse changes
  useEffect(() => {
    if (selectedCourse) {
      loadCourseData(selectedCourse.id);
    }
  }, [selectedCourse]);

  const loadCourseData = (courseId) => {
    // Mock assignments data
    const mockAssignments = [
      {
        id: '1',
        title: 'Assignment 1: Introduction to Programming',
        description: 'Write a simple program to calculate factorial of a number.',
        dueDate: '2023-04-15',
        maxPoints: 100,
        submitted: 12,
        courseId: '101',
      },
      {
        id: '2',
        title: 'Assignment 2: Loops and Arrays',
        description: 'Implement various sorting algorithms and compare their performance.',
        dueDate: '2023-04-30',
        maxPoints: 100,
        submitted: 10,
        courseId: '101',
      },
      {
        id: '3',
        title: 'Assignment 1: Linked Lists',
        description: 'Implement a singly linked list and its operations.',
        dueDate: '2023-04-20',
        maxPoints: 100,
        submitted: 8,
        courseId: '102',
      },
    ];
    
    // Mock students data
    const mockStudents = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        grade: 'A',
        attendance: '90%',
        courseId: '101',
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        grade: 'B+',
        attendance: '85%',
        courseId: '101',
      },
      {
        id: '3',
        name: 'Bob Johnson',
        email: 'bob.johnson@example.com',
        grade: 'A-',
        attendance: '95%',
        courseId: '101',
      },
      {
        id: '4',
        name: 'Alice Brown',
        email: 'alice.brown@example.com',
        grade: 'B',
        attendance: '80%',
        courseId: '102',
      },
    ];
    
    setAssignments(mockAssignments.filter(a => a.courseId === courseId));
    setStudents(mockStudents.filter(s => s.courseId === courseId));
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    loadCourseData(course.id);
  };

  const handleOpenDialog = (type, item = {}) => {
    setDialogType(type);
    setFormData(item);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSaveDialog = () => {
    // In a real app, this would be an API call
    if (dialogType === 'assignment') {
      if (formData.id) {
        // Edit existing assignment
        setAssignments(assignments.map(a => 
          a.id === formData.id ? { ...formData } : a
        ));
      } else {
        // Add new assignment
        const newAssignment = {
          ...formData,
          id: Date.now().toString(),
          courseId: selectedCourse.id,
          submitted: 0,
        };
        setAssignments([...assignments, newAssignment]);
      }
    } else if (dialogType === 'student-grade') {
      // Update student grade
      setStudents(students.map(s => 
        s.id === formData.id ? { ...s, grade: formData.grade } : s
      ));
    }
    
    handleCloseDialog();
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Course Management
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        Manage your courses, assignments, and students.
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {/* Course Selection */}
        <Grid item xs={12} md={3}>
          <Paper>
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
              <Class color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">My Courses</Typography>
            </Box>
            <Divider />
            <Box sx={{ p: 2 }}>
              {courses.map((course) => (
                <Card 
                  key={course.id} 
                  sx={{ 
                    mb: 2, 
                    cursor: 'pointer',
                    border: selectedCourse?.id === course.id ? '2px solid #1976d2' : 'none'
                  }}
                  onClick={() => handleCourseSelect(course)}
                >
                  <CardContent>
                    <Typography variant="h6">{course.name}</Typography>
                    <Typography variant="body2" color="textSecondary">{course.code}</Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Students: {course.enrolled}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Course Details & Management */}
        <Grid item xs={12} md={9}>
          {selectedCourse ? (
            <Paper>
              <Box sx={{ p: 2 }}>
                <Typography variant="h5">{selectedCourse.name}</Typography>
                <Typography variant="subtitle1" color="primary">{selectedCourse.code}</Typography>
                <Box sx={{ mt: 1 }}>
                  <Typography variant="body2">
                    <strong>Schedule:</strong> {selectedCourse.schedule}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Location:</strong> {selectedCourse.location}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Enrolled:</strong> {selectedCourse.enrolled} students
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabValue} onChange={handleTabChange} aria-label="course management tabs">
                  <Tab label="Assignments" />
                  <Tab label="Students" />
                </Tabs>
              </Box>
              
              <TabPanel value={tabValue} index={0}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">Assignments</Typography>
                  <Button 
                    variant="contained" 
                    startIcon={<Add />}
                    onClick={() => handleOpenDialog('assignment')}
                  >
                    Add Assignment
                  </Button>
                </Box>
                
                {assignments.length === 0 ? (
                  <Typography color="textSecondary" sx={{ textAlign: 'center', py: 3 }}>
                    No assignments yet. Create your first assignment!
                  </Typography>
                ) : (
                  <Grid container spacing={2}>
                    {assignments.map((assignment) => (
                      <Grid item xs={12} key={assignment.id}>
                        <Card>
                          <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Box>
                                <Typography variant="h6">{assignment.title}</Typography>
                                <Typography variant="body2" sx={{ mt: 1 }}>
                                  {assignment.description}
                                </Typography>
                                <Box sx={{ mt: 2 }}>
                                  <Chip 
                                    label={`Due: ${assignment.dueDate}`} 
                                    size="small" 
                                    color="primary"
                                    sx={{ mr: 1 }}
                                  />
                                  <Chip 
                                    label={`${assignment.maxPoints} points`} 
                                    size="small"
                                    sx={{ mr: 1 }}
                                  />
                                  <Chip 
                                    label={`${assignment.submitted} submissions`} 
                                    size="small"
                                  />
                                </Box>
                              </Box>
                              <Box>
                                <IconButton 
                                  color="primary"
                                  onClick={() => handleOpenDialog('assignment', assignment)}
                                >
                                  <Edit />
                                </IconButton>
                                <IconButton color="error">
                                  <Delete />
                                </IconButton>
                              </Box>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </TabPanel>
              
              <TabPanel value={tabValue} index={1}>
                <Typography variant="h6" gutterBottom>Students</Typography>
                
                {students.length === 0 ? (
                  <Typography color="textSecondary" sx={{ textAlign: 'center', py: 3 }}>
                    No students enrolled in this course yet.
                  </Typography>
                ) : (
                  <Grid container spacing={2}>
                    {students.map((student) => (
                      <Grid item xs={12} sm={6} md={4} key={student.id}>
                        <Card>
                          <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                              <Person sx={{ mr: 1, color: 'text.secondary' }} />
                              <Typography variant="h6">{student.name}</Typography>
                            </Box>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                              {student.email}
                            </Typography>
                            <Divider sx={{ my: 1 }} />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Box>
                                <Typography variant="body2">
                                  <strong>Grade:</strong> {student.grade}
                                </Typography>
                                <Typography variant="body2">
                                  <strong>Attendance:</strong> {student.attendance}
                                </Typography>
                              </Box>
                              <Button 
                                variant="outlined" 
                                size="small"
                                onClick={() => handleOpenDialog('student-grade', student)}
                              >
                                Grade
                              </Button>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </TabPanel>
            </Paper>
          ) : (
            <Paper>
              <Box sx={{ p: 5, textAlign: 'center' }}>
                <Typography variant="h6" color="textSecondary">
                  Select a course to manage
                </Typography>
              </Box>
            </Paper>
          )}
        </Grid>
      </Grid>

      {/* Dialog for adding/editing assignments or grading students */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {dialogType === 'assignment' 
            ? (formData.id ? 'Edit Assignment' : 'New Assignment')
            : 'Update Student Grade'
          }
        </DialogTitle>
        <DialogContent>
          {dialogType === 'assignment' && (
            <>
              <TextField
                autoFocus
                margin="dense"
                name="title"
                label="Assignment Title"
                fullWidth
                variant="outlined"
                value={formData.title || ''}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <TextField
                margin="dense"
                name="description"
                label="Description"
                fullWidth
                variant="outlined"
                multiline
                rows={3}
                value={formData.description || ''}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <TextField
                margin="dense"
                name="dueDate"
                label="Due Date"
                type="date"
                fullWidth
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                value={formData.dueDate || ''}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <TextField
                margin="dense"
                name="maxPoints"
                label="Maximum Points"
                type="number"
                fullWidth
                variant="outlined"
                value={formData.maxPoints || ''}
                onChange={handleInputChange}
              />
            </>
          )}
          
          {dialogType === 'student-grade' && (
            <>
              <Typography variant="body1" gutterBottom>
                Student: {formData.name}
              </Typography>
              <TextField
                autoFocus
                margin="dense"
                name="grade"
                label="Grade"
                fullWidth
                variant="outlined"
                value={formData.grade || ''}
                onChange={handleInputChange}
                placeholder="A, B+, C, etc."
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveDialog} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LecturerCourseManager; 