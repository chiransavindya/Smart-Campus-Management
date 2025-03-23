import {
    Assessment,
    School,
    Timeline,
    TrendingUp,
} from '@mui/icons-material';
import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Divider,
    Grid,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

// Helper function to calculate GPA
const calculateGPA = (courses) => {
  const validCourses = courses.filter(course => course.grade !== null);
  
  if (validCourses.length === 0) return 0;
  
  const gradePoints = {
    'A+': 4.0, 'A': 4.0, 'A-': 3.7,
    'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7,
    'D+': 1.3, 'D': 1.0, 'D-': 0.7,
    'F': 0.0
  };
  
  let totalCredits = 0;
  let totalPoints = 0;
  
  validCourses.forEach(course => {
    const credits = course.credits;
    const gradePoint = gradePoints[course.grade] || 0;
    totalCredits += credits;
    totalPoints += credits * gradePoint;
  });
  
  return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0;
};

const GradeViewer = () => {
  const [currentSemester, setCurrentSemester] = useState('Spring 2023');
  const [semesters, setSemesters] = useState([]);
  const [courses, setCourses] = useState([]);
  const [cumulativeGPA, setCumulativeGPA] = useState(0);
  const [semesterGPA, setSemesterGPA] = useState(0);
  const [transcript, setTranscript] = useState([]);

  useEffect(() => {
    // Mock data - in a real app this would be fetched from the server
    const semesters = [
      'Spring 2023',
      'Fall 2022',
      'Spring 2022',
      'Fall 2021',
    ];
    
    setSemesters(semesters);
    
    const mockCoursesBySemester = {
      'Spring 2023': [
        {
          id: '101',
          code: 'CS101',
          name: 'Introduction to Computer Science',
          credits: 3,
          grade: 'A',
          instructor: 'Dr. Smith',
        },
        {
          id: '102',
          code: 'CS201',
          name: 'Data Structures and Algorithms',
          credits: 4,
          grade: 'B+',
          instructor: 'Dr. Johnson',
        },
        {
          id: '103',
          code: 'MATH101',
          name: 'Calculus I',
          credits: 4,
          grade: 'A-',
          instructor: 'Dr. Williams',
        },
        {
          id: '104',
          code: 'ENG101',
          name: 'English Composition',
          credits: 3,
          grade: 'A',
          instructor: 'Dr. Davis',
        },
      ],
      'Fall 2022': [
        {
          id: '201',
          code: 'CS102',
          name: 'Computer Programming',
          credits: 3,
          grade: 'A',
          instructor: 'Dr. Brown',
        },
        {
          id: '202',
          code: 'MATH102',
          name: 'Calculus II',
          credits: 4,
          grade: 'B',
          instructor: 'Dr. Wilson',
        },
        {
          id: '203',
          code: 'PHYS101',
          name: 'Physics I',
          credits: 4,
          grade: 'B+',
          instructor: 'Dr. Moore',
        },
      ],
      'Spring 2022': [
        {
          id: '301',
          code: 'CHEM101',
          name: 'Chemistry I',
          credits: 4,
          grade: 'B',
          instructor: 'Dr. Taylor',
        },
        {
          id: '302',
          code: 'BIO101',
          name: 'Biology I',
          credits: 4,
          grade: 'A-',
          instructor: 'Dr. Anderson',
        },
        {
          id: '303',
          code: 'HIST101',
          name: 'World History',
          credits: 3,
          grade: 'A',
          instructor: 'Dr. Thomas',
        },
      ],
      'Fall 2021': [
        {
          id: '401',
          code: 'PSYCH101',
          name: 'Introduction to Psychology',
          credits: 3,
          grade: 'A',
          instructor: 'Dr. White',
        },
        {
          id: '402',
          code: 'SOC101',
          name: 'Introduction to Sociology',
          credits: 3,
          grade: 'B+',
          instructor: 'Dr. Harris',
        },
        {
          id: '403',
          code: 'ECON101',
          name: 'Principles of Economics',
          credits: 3,
          grade: 'B',
          instructor: 'Dr. Martin',
        },
      ],
    };

    // Set transcript history with GPA for each semester
    const history = semesters.map(semester => {
      const semesterCourses = mockCoursesBySemester[semester] || [];
      return {
        semester,
        gpa: calculateGPA(semesterCourses),
        courseCount: semesterCourses.length,
        credits: semesterCourses.reduce((sum, course) => sum + course.credits, 0)
      };
    });
    
    setTranscript(history);
    
    // Load courses for the selected semester
    const selectedCourses = mockCoursesBySemester[currentSemester] || [];
    setCourses(selectedCourses);
    
    // Calculate GPA for the current semester
    setSemesterGPA(calculateGPA(selectedCourses));
    
    // Calculate cumulative GPA across all semesters
    const allCourses = Object.values(mockCoursesBySemester).flat();
    setCumulativeGPA(calculateGPA(allCourses));
  }, [currentSemester]);

  const handleSemesterChange = (event) => {
    setCurrentSemester(event.target.value);
  };

  // Helper function to render the grade with appropriate color
  const renderGradeWithColor = (grade) => {
    if (!grade) return <Chip label="No Grade" size="small" color="default" />;
    
    let color = 'default';
    if (grade.startsWith('A')) color = 'success';
    else if (grade.startsWith('B')) color = 'primary';
    else if (grade.startsWith('C')) color = 'warning';
    else if (grade.startsWith('D') || grade.startsWith('F')) color = 'error';
    
    return <Chip label={grade} size="small" color={color} />;
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Academic Records
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        View your grades, GPA, and academic history.
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {/* GPA Summary Cards */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <School color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Cumulative GPA</Typography>
              </Box>
              <Typography variant="h3" sx={{ textAlign: 'center', py: 2 }}>{cumulativeGPA}</Typography>
              <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center' }}>
                Overall GPA across all semesters
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUp color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Semester GPA</Typography>
              </Box>
              <Typography variant="h3" sx={{ textAlign: 'center', py: 2 }}>{semesterGPA}</Typography>
              <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center' }}>
                GPA for {currentSemester}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Semester Selector and Grade Table */}
        <Grid item xs={12}>
          <Paper>
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Assessment color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Course Grades</Typography>
              </Box>
              <Box sx={{ minWidth: 200 }}>
                <Select
                  value={currentSemester}
                  onChange={handleSemesterChange}
                  fullWidth
                  size="small"
                >
                  {semesters.map((semester) => (
                    <MenuItem key={semester} value={semester}>
                      {semester}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </Box>
            <Divider />
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Course</TableCell>
                    <TableCell>Credits</TableCell>
                    <TableCell>Instructor</TableCell>
                    <TableCell>Grade</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {courses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell>
                        <Box>
                          <Typography variant="body1">{course.name}</Typography>
                          <Typography variant="body2" color="textSecondary">{course.code}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{course.credits}</TableCell>
                      <TableCell>{course.instructor}</TableCell>
                      <TableCell>{renderGradeWithColor(course.grade)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Academic History */}
        <Grid item xs={12}>
          <Paper>
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
              <Timeline color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Academic History</Typography>
            </Box>
            <Divider />
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Semester</TableCell>
                    <TableCell>GPA</TableCell>
                    <TableCell>Courses</TableCell>
                    <TableCell>Credits</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transcript.map((record) => (
                    <TableRow key={record.semester}>
                      <TableCell>{record.semester}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography 
                            sx={{ 
                              color: 
                                record.gpa >= 3.7 ? 'success.main' :
                                record.gpa >= 3.0 ? 'primary.main' :
                                record.gpa >= 2.0 ? 'warning.main' : 'error.main'
                            }}
                          >
                            {record.gpa}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{record.courseCount}</TableCell>
                      <TableCell>{record.credits}</TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => setCurrentSemester(record.semester)}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GradeViewer; 